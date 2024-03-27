// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC94kUlN63fiiFgPCXeQNO5Q7Si9k73Ru0",
  authDomain: "atcloud-fa6f0.firebaseapp.com",
  databaseURL: "https://atcloud-fa6f0-default-rtdb.firebaseio.com",
  projectId: "atcloud-fa6f0",
  storageBucket: "atcloud-fa6f0.appspot.com",
  messagingSenderId: "37639007228",
  appId: "1:37639007228:web:ebec68112b9a179acde079"
};


// Inicializando o Firebase
const app = firebase.initializeApp(firebaseConfig);


// Inicializando o banco de dados Firebase
const db = firebase.database(app);


// Criando os gráficos
document.getElementById('altitudeChart');
const altitudeChart = new Chart(document.getElementById('altitudeChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [], // Rótulos no eixo X (tempo)
    datasets: [
      {
        label: 'Altitude (m)', // Legenda do gráfico
        data: [], // Dados de altitude
        borderColor: 'blue', // Cor da linha
        borderWidth: 4, // Largura da linha
        yAxisID: 'alt',
        fill: false // Não preencher a área sob a linha
      }
    ]
  },
  options: {
    responsive: true,
    scale: {


      alt: {
        position: 'left',
        beginAtZero: true,
        min: 0,
        max: 8848
      }
    }
  }
});


const pressureChart = new Chart(document.getElementById('pressureChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Pressão (hPa)',
        data: [],
        borderColor: 'red',
        borderWidth: 4,
        yAxisID : 'press',
        fill: false
      }
    ]
  },
  options: {
    responsive :true,
    scale: {

      press:{
        position: 'left',
        beginAtZero: true,
        min: 0,
        max:1013
      }

    }
  }
});


const temperatureChart = new Chart(document.getElementById('temperatureChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [],
        borderColor: 'green',
        borderWidth: 4,
        yAxisID: 'temp',
        fill: false
      }
    ]
  },
  options: {
    responsive :true,
    scale: {

      temp:{
        position: 'left',
        beginAtZero: true,
        min: 0,
        max:50
      }

    }
  }
});

const humidityChart = new Chart(document.getElementById('humidityChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Umidade (%)',
        data: [],
        borderColor: 'black',
        borderWidth: 4,
        fill: false
      }
    ]
  },
  options: {
  }
});


const windSpeedChart = new Chart(document.getElementById('windSpeedChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Velocidade do Vento (m/s)',
        data: [],
        borderColor: 'purple',
        borderWidth: 4,
        yAxisID: 'vent',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scale:{
      vent:{
        position: 'left',
        beginAtZero: true,
        min: 0,
        max:50
        
      }
    }


  }
});
document.getElementById('windSpeedChart');


// Função para atualizar os gráficos
function updateCharts(data) {

  // Atualizar gráfico de altitude
  if (data && data.altitude_bmp) {
    const keys = Object.keys(data.altitude_bmp);
    const values = Object.values(data.altitude_bmp);


    // Atualizar o gráfico com todos os valores desde o início
    altitudeChart.data.labels = keys;
    altitudeChart.data.datasets[0].data = values;
    altitudeChart.update();
  }


  // Atualizar gráfico de pressão
  if (data && data.pressao_bmp) {
    const keys = Object.keys(data.pressao_bmp);
    const values = Object.values(data.pressao_bmp);


    // Atualizar o gráfico com todos os valores desde o início
    pressureChart.data.labels = keys;
    pressureChart.data.datasets[0].data = values;
    pressureChart.update();
  }

  // Atualizar gráfico de temperatura
  if (data && data.temperatura_dht) {
    const keys = Object.keys(data.temperatura_dht);
    const values = Object.values(data.temperatura_dht);


    // Atualizar o gráfico com todos os valores desde o início
    temperatureChart.data.labels = keys;
    temperatureChart.data.datasets[0].data = values;
    temperatureChart.update();
  }

  // Atualizar gráfico de umidade
  if (data && data.umidade_dht) {
    const keys = Object.keys(data.umidade_dht);
    const values = Object.values(data.umidade_dht);


    // Atualizar o gráfico com todos os valores desde o início
    humidityChart.data.labels = keys;
    humidityChart.data.datasets[0].data = values;
    humidityChart.update();
  }

  // Atualizar gráfico de velocidade do vento

  if (data && data.velocidade_vento) {
    const keys = Object.keys(data.velocidade_vento);
    const values = Object.values(data.velocidade_vento);


    // Atualizar o gráfico com todos os valores desde o início
    windSpeedChart.data.labels = keys;
    windSpeedChart.data.datasets[0].data = values;
    windSpeedChart.update();
  }


}

// Escutando as mudanças no banco de dados Firebase
firebase.database().ref('leituras').on('value', (snapshot) => {
  const data = snapshot.val();
  updateCharts(data);
});


// Atualizar os gráficos a cada 10 segundos
setInterval(() => {
  // Para pegar todos os valores desde o início, você pode usar o método limitToLast
  firebase
    .database()
    .ref('leituras')
    .limitToLast(10000) // Ajuste o número de valores que deseja buscar
    .once('value', (snapshot) => {
      const data = snapshot.val();
      updateCharts(data);
    });
}, 10000); // 10 segundos em milissegundos



