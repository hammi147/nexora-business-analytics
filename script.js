const orders = [
    {
        id: "#NX-10482",
        customer: "Olivia Martin",
        date: "Sep 28, 2026",
        amount: 1240,
        status: "Completed"
    },
    {
        id: "#NX-10481",
        customer: "James Wilson",
        date: "Sep 27, 2026",
        amount: 860,
        status: "Pending"
    },
    {
        id: "#NX-10480",
        customer: "Sophia Davis",
        date: "Sep 26, 2026",
        amount: 2150,
        status: "Completed"
    },
    {
        id: "#NX-10479",
        customer: "Daniel Brown",
        date: "Sep 25, 2026",
        amount: 590,
        status: "Cancelled"
    },
    {
        id: "#NX-10478",
        customer: "Emma Johnson",
        date: "Sep 24, 2026",
        amount: 1730,
        status: "Completed"
    },
    {
        id: "#NX-10477",
        customer: "Noah Taylor",
        date: "Sep 23, 2026",
        amount: 940,
        status: "Pending"
    },
    {
        id: "#NX-10476",
        customer: "Mia Anderson",
        date: "Sep 22, 2026",
        amount: 1280,
        status: "Completed"
    },
    {
        id: "#NX-10475",
        customer: "Ethan Thomas",
        date: "Sep 21, 2026",
        amount: 720,
        status: "Completed"
    },
    {
        id: "#NX-10474",
        customer: "Ava Jackson",
        date: "Sep 20, 2026",
        amount: 1890,
        status: "Pending"
    },
    {
        id: "#NX-10473",
        customer: "Lucas White",
        date: "Sep 19, 2026",
        amount: 640,
        status: "Completed"
    }
];


// ==========================================
// ELEMENTS
// ==========================================

const ordersTable = document.getElementById("ordersTable");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const resetFilters = document.getElementById("resetFilters");

const resultCount = document.getElementById("resultCount");
const orderCountBadge = document.getElementById("orderCountBadge");

const dateFilter = document.getElementById("dateFilter");

const revenueValue = document.getElementById("revenueValue");
const ordersValue = document.getElementById("ordersValue");
const customersValue = document.getElementById("customersValue");
const conversionValue = document.getElementById("conversionValue");

const revenueGrowth = document.getElementById("revenueGrowth");
const ordersGrowth = document.getElementById("ordersGrowth");
const customersGrowth = document.getElementById("customersGrowth");
const conversionGrowth = document.getElementById("conversionGrowth");

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const markNotifications = document.getElementById("markNotifications");
const notificationDot = document.querySelector(".notification-dot");

const toast = document.getElementById("toast");

const emailNotifications = document.getElementById("emailNotifications");
const weeklyReports = document.getElementById("weeklyReports");
const compactMode = document.getElementById("compactMode");


// ==========================================
// RENDER ORDERS
// ==========================================

function renderOrders(data) {

    ordersTable.innerHTML = "";

    orderCountBadge.textContent = data.length;

    if (data.length === 0) {

        ordersTable.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#7b7f89;
                    "
                >
                    No orders found.
                </td>
            </tr>
        `;

        resultCount.textContent = "Showing 0 orders";

        return;
    }


    data.forEach(order => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${order.id}</strong>
            </td>

            <td>
                ${order.customer}
            </td>

            <td>
                ${order.date}
            </td>

            <td>
                <strong>
                    $${order.amount.toLocaleString()}
                </strong>
            </td>

            <td>
                <span class="status ${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </td>
        `;

        ordersTable.appendChild(row);
    });


    resultCount.textContent =
        `Showing ${data.length} order${data.length !== 1 ? "s" : ""}`;
}


// ==========================================
// FILTER ORDERS
// ==========================================

function filterOrders() {

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const selectedStatus =
        statusFilter.value;


    const filteredOrders = orders.filter(order => {

        const matchesSearch =
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "All" ||
            order.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });


    renderOrders(filteredOrders);
}


searchInput.addEventListener(
    "input",
    filterOrders
);


statusFilter.addEventListener(
    "change",
    filterOrders
);


// ==========================================
// RESET FILTERS
// ==========================================

resetFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";
        statusFilter.value = "All";

        renderOrders(orders);

        showToast("Filters reset successfully");
    }
);


// ==========================================
// DATE FILTER
// ==========================================

dateFilter.addEventListener(
    "change",
    () => {

        const selected =
            dateFilter.value;


        if (selected === "week") {

            revenueValue.textContent = "$12,480";
            ordersValue.textContent = "326";
            customersValue.textContent = "2,184";
            conversionValue.textContent = "4.35%";

            revenueGrowth.innerHTML =
                "↑ 6.4% <span>vs last period</span>";

            ordersGrowth.innerHTML =
                "↑ 5.8% <span>vs last period</span>";

            customersGrowth.innerHTML =
                "↑ 4.2% <span>vs last period</span>";

            conversionGrowth.innerHTML =
                "↑ 0.8% <span>vs last period</span>";

            updateRevenueChart("week");

            showToast(
                "Showing weekly analytics"
            );

        } else if (selected === "month") {

            revenueValue.textContent = "$48,294";
            ordersValue.textContent = "1,284";
            customersValue.textContent = "8,549";
            conversionValue.textContent = "4.82%";

            revenueGrowth.innerHTML =
                "↑ 12.8% <span>vs last period</span>";

            ordersGrowth.innerHTML =
                "↑ 8.2% <span>vs last period</span>";

            customersGrowth.innerHTML =
                "↑ 5.4% <span>vs last period</span>";

            conversionGrowth.innerHTML =
                "↑ 1.6% <span>vs last period</span>";

            updateRevenueChart("month");

            showToast(
                "Showing monthly analytics"
            );

        } else {

            revenueValue.textContent = "$584,920";
            ordersValue.textContent = "15,842";
            customersValue.textContent = "42,680";
            conversionValue.textContent = "5.14%";

            revenueGrowth.innerHTML =
                "↑ 18.6% <span>vs last year</span>";

            ordersGrowth.innerHTML =
                "↑ 14.2% <span>vs last year</span>";

            customersGrowth.innerHTML =
                "↑ 11.7% <span>vs last year</span>";

            conversionGrowth.innerHTML =
                "↑ 2.4% <span>vs last year</span>";

            updateRevenueChart("year");

            showToast(
                "Showing yearly analytics"
            );
        }
    }
);


// ==========================================
// REVENUE CHART
// ==========================================

const revenueCanvas =
    document.getElementById("revenueChart");


const revenueChart = new Chart(
    revenueCanvas,
    {
        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep"
            ],

            datasets: [
                {
                    label: "Revenue",

                    data: [
                        24000,
                        28500,
                        31000,
                        27500,
                        36000,
                        39800,
                        42000,
                        45200,
                        48294
                    ],

                    borderColor: "#6d5dfc",

                    backgroundColor:
                        "rgba(109, 93, 252, 0.10)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 3,

                    pointHoverRadius: 6,

                    pointBackgroundColor:
                        "#6d5dfc"
                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#17181c",

                    padding: 12,

                    displayColors: false,

                    callbacks: {

                        label: function(context) {

                            return `$${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },

            scales: {

                y: {

                    beginAtZero: false,

                    grid: {
                        color: "#eeeeF2"
                    },

                    ticks: {

                        color: "#8a8d96",

                        font: {
                            size: 10
                        },

                        callback: function(value) {

                            return "$" +
                                value / 1000 +
                                "k";
                        }
                    }
                },

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {

                        color: "#8a8d96",

                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    }
);


// ==========================================
// UPDATE REVENUE CHART
// ==========================================

function updateRevenueChart(range) {

    if (range === "week") {

        revenueChart.data.labels = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];

        revenueChart.data.datasets[0].data = [
            1200,
            1650,
            1420,
            1980,
            2240,
            1870,
            2120
        ];

    } else if (range === "month") {

        revenueChart.data.labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
        ];

        revenueChart.data.datasets[0].data = [
            24000,
            28500,
            31000,
            27500,
            36000,
            39800,
            42000,
            45200,
            48294
        ];

    } else {

        revenueChart.data.labels = [
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026"
        ];

        revenueChart.data.datasets[0].data = [
            210000,
            275000,
            340000,
            410000,
            492000,
            584920
        ];
    }


    revenueChart.update();
}


// ==========================================
// SALES DISTRIBUTION CHART
// ==========================================

const salesCanvas =
    document.getElementById("salesChart");


new Chart(
    salesCanvas,
    {
        type: "doughnut",

        data: {

            labels: [
                "Electronics",
                "Fashion",
                "Home & Living"
            ],

            datasets: [
                {
                    data: [
                        46,
                        32,
                        22
                    ],

                    backgroundColor: [
                        "#6d5dfc",
                        "#3b82f6",
                        "#f59e0b"
                    ],

                    borderWidth: 0,

                    hoverOffset: 7
                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "72%",

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#17181c",

                    padding: 10,

                    callbacks: {

                        label: function(context) {

                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    }
);


// ==========================================
// MOBILE SIDEBAR
// ==========================================

menuToggle.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("open");
    }
);


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            if (!link.dataset.page) {
                return;
            }


            event.preventDefault();


            navLinks.forEach(item => {

                item.classList.remove("active");
            });


            link.classList.add("active");


            const page =
                link.dataset.page;


            if (page === "dashboard") {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else if (page === "analytics") {

                document
                    .getElementById("analytics")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            } else if (page === "orders") {

                document
                    .getElementById("orders")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            } else if (page === "customers") {

                document
                    .getElementById("customers")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "Customer overview opened"
                );

            } else if (page === "settings") {

                document
                    .getElementById("settings")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "Settings opened"
                );
            }


            if (window.innerWidth <= 800) {

                sidebar.classList.remove("open");
            }
        }
    );
});


// ==========================================
// NOTIFICATION PANEL
// ==========================================

notificationBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        notificationPanel.classList.toggle("show");
    }
);


notificationPanel.addEventListener(
    "click",
    event => {

        event.stopPropagation();
    }
);


document.addEventListener(
    "click",
    () => {

        notificationPanel.classList.remove("show");
    }
);


// ==========================================
// MARK NOTIFICATIONS AS READ
// ==========================================

markNotifications.addEventListener(
    "click",
    () => {

        notificationDot.style.display = "none";

        notificationPanel.classList.remove("show");

        showToast(
            "Notifications marked as read"
        );
    }
);


// ==========================================
// SETTINGS
// ==========================================

emailNotifications.addEventListener(
    "change",
    () => {

        if (emailNotifications.checked) {

            showToast(
                "Email notifications enabled"
            );

        } else {

            showToast(
                "Email notifications disabled"
            );
        }
    }
);


weeklyReports.addEventListener(
    "change",
    () => {

        if (weeklyReports.checked) {

            showToast(
                "Weekly reports enabled"
            );

        } else {

            showToast(
                "Weekly reports disabled"
            );
        }
    }
);


compactMode.addEventListener(
    "change",
    () => {

        document.body.classList.toggle(
            "compact-mode",
            compactMode.checked
        );


        if (compactMode.checked) {

            showToast(
                "Compact dashboard enabled"
            );

        } else {

            showToast(
                "Compact dashboard disabled"
            );
        }
    }
);


// ==========================================
// TOAST
// ==========================================

let toastTimer;


function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");


    toastTimer = setTimeout(
        () => {

            toast.classList.remove("show");

        },
        2500
    );
}


// ==========================================
// INITIALIZE
// ==========================================

renderOrders(orders);

