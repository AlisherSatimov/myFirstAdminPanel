//  sidebasr toggle

let sidebarOpen = false;
let sidebar = document.querySelector("aside");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = false;
  }
}

// ======================== CHARTS ========================
// BAR CHARTS

let options1 = {
  series: [
    {
      data: [12, 19, 3, 5, 2],
    },
  ],
  chart: {
    type: "bar",
    height: 500,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Monday", "Tueshday", "Wednethday", "Thursday", "Friday"],
  },
};

let chart1 = new ApexCharts(document.querySelector("#bar-chart"), options1);
chart1.render();

// AREA
let options2 = {
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

let chart2 = new ApexCharts(document.querySelector("#area-chart"), options2);
chart2.render();

// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Main

let usersCount = document.querySelector("#users-count");
let ordersCount = document.querySelector("#orders-count");
let productsCount = document.querySelector("#products-count");

axios.defaults.baseURL = "http://localhost:3000";

const wait = (delay) => new Promise((res) => setTimeout(res, delay));
const displayStat = async function (data, element) {
  let random = Math.floor(Math.random() * (100 - 70 + 1) + 70);
  for (let i = 1; i <= data.length; i++) {
    await wait(random);
    element.innerHTML = i;
  }
};

(async function () {
  let users = await axios.get("/users");
  let orders = await axios.get("/orders");
  let products = await axios.get("/products");
  displayStat(users.data, usersCount);
  displayStat(orders.data, ordersCount);
  displayStat(products.data, productsCount);
})();

// Main end
