// LOGIN

function login() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value.trim();

    if(username === "" || password === ""){

        document.getElementById("message").innerHTML =
            "Please enter username and password."

        return;
    }

    if(username === "admin" &&
       password === "admin123"){

        sessionStorage.setItem(
            "username",
            username
        );

        window.location.href =
            "dashboard.html";

    }else{

        document.getElementById("message").innerHTML =
            "Invalid Username or Password";
    }
}

// LOGOUT

function logout() {

    sessionStorage.clear();
    window.location.href = "login.html";
}

// CREATE SHIPMENT

function createShipment() {

    let trackingId =
        "TRK" + Math.floor(10000 + Math.random() * 90000);

    let shipment = {
        trackingId: trackingId,
        sender: document.getElementById("sender").value,
        receiver: document.getElementById("receiver").value,
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        weight: document.getElementById("weight").value,
        shipmentType: document.getElementById("ShipmentType").value,
        status: "Booked",
        createdDate: new Date().toLocaleDateString()
    };

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    shipments.push(shipment);

    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );

    alert("Shipment Created Successfully");

    document.querySelector("form").reset();
}

// DASHBOARD COUNTERS

function loadDashboardStats() {

    console.log("Dashboard Stats Called");

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    console.log(shipments);

    console.log("Dashboard function called")

    let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

    console.log("Shipments:', shipments);
                let total = shipemnts.lenght;
    console.log("Total:", total);

    console.log("loadDashboardStats executed");

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    console.log(shipments);

    let total = shipments.length;
    let booked = shipments.filter(s => s.status === "Booked").length;
    let inTransit = shipments.filter(s => s.status === "In Transit").length;
    let delivered = shipments.filter(s => s.status === "Delivered").length;

    let totalEl = document.getElementById("totalShipments");
    let bookedEl = document.getElementById("booked");
    let inTransitEl = document.getElementById("inTransit");
    let deliveredEl = document.getElementById("delivered");

    if (totalEl) totalEl.innerText = total;
    if (bookedEl) bookedEl.innerText = booked;
    if (inTransitEl) inTransitEl.innerText = inTransit;
    if (deliveredEl) deliveredEl.innerText = delivered;
}



function trackShipment() {

    let trackingId =
        document.getElementById("trackingId").value.trim();

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    let shipment =
        shipments.find(s => s.trackingId === trackingId);

    let result =
        document.getElementById("trackingResult");

    if (!result) return;

    if (shipment) {

        result.innerHTML = `
            <h3>Shipment Found</h3>
            <p><b>Tracking ID:</b> ${shipment.trackingId}</p>
            <p><b>Sender:</b> ${shipment.sender}</p>
            <p><b>Receiver:</b> ${shipment.receiver}</p>
            <p><b>Origin:</b> ${shipment.origin}</p>
            <p><b>Destination:</b> ${shipment.destination}</p>
            <p><b>Status:</b> ${shipment.status}</p>
        `;

    } else {

        result.innerHTML =
            "<p style='color:red'>Tracking ID Not Found</p>";
    }
}
function loadShipments() {

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    let tableBody =
        document.getElementById("shipmentBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (shipments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8">No shipments available</td>
            </tr>
        `;
        return;
    }

    shipments.forEach(shipment => {

        tableBody.innerHTML += `
            <tr>
                <td>${shipment.trackingId}</td>
                <td>${shipment.sender}</td>
                <td>${shipment.receiver}</td>
                <td>${shipment.origin}</td>
                <td>${shipment.destination}</td>
                <td>${shipment.createdDate}</td>
                <td>${shipment.status}</td>
                <td>
                    <button onclick="deleteShipment('${shipment.trackingId}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

window.onload = function () {
    loadShipments();
}

function updateShipmentStatus(trackingId, status) {

    let shipment =
        JSON.parse(localStorage.getItem(trackingId));

    if (!shipment) return;

    shipment.status = status;

    localStorage.setItem(
        trackingId,
        JSON.stringify(shipment)
    );

    loadShipments();
    loadDashboardStats();
}

function deleteShipment(trackingId) {

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    shipments = shipments.filter(
        shipment => shipment.trackingId !== trackingId
    );

    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );

    loadShipments();
}

function loadAnalyticsChart() {

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    let booked =
        shipments.filter(s => s.status === "Booked").length;

    let inTransit =
        shipments.filter(s => s.status === "In Transit").length;

    let delivered =
        shipments.filter(s => s.status === "Delivered").length;

    let chartCanvas =
        document.getElementById("shipmentPieChart");

    if (!chartCanvas) return;

    new Chart(chartCanvas, {
        type: "pie",
        data: {
            labels: [
                "Booked",
                "In Transit",
                "Delivered"
            ],
            datasets: [{
                data: [
                    booked,
                    inTransit,
                    delivered
                ]
            }]
        }
    });
}
function searchShipment() {

    let filter =
        document.getElementById("searchShipment")
        .value
        .toUpperCase();

    let rows =
        document.querySelectorAll("#shipmentBody tr");

    rows.forEach(row => {

        let sender =
            row.cells[1].innerText.toUpperCase();

        let receiver =
            row.cells[2].innerText.toUpperCase();

        if (
            sender.includes(filter) ||
            receiver.includes(filter)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
function loadUser() {

    let user =
        sessionStorage.getItem("username");

    let welcome =
        document.getElementById("welcomeUser");

    if(welcome && user){
        welcome.innerHTML =
            "Welcome, " + user;
    }
}

function exportCSV() {

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    let csv =
        "TrackingID, Sender, Receiver, Origin, Destination, Status\n";

    shipments.forEach(shipment => {

        csv +=
            `${shipment.trackingId},${shipment.sender},${shipment.receiver},${shipment.origin},${shipment.destination},${shipment.status}\n`;

    });

    let blob =
        new Blob([csv], { type: "text/csv" });

    let link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "shipments.csv";

    link.click();
}
function loadProfile() {

    let username =
        sessionStorage.getItem("username");

    let profileName =
        document.getElementById("profileName");

    if(profileName){
        profileName.innerText =
            username || "Admin";
    }
}
function updateStatus() {

    let trackingId =
        document.getElementById("trackingId").value.trim();

    let newStatus =
        document.getElementById("newStatus").value;

    let shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    let shipment =
        shipments.find(s => s.trackingId === trackingId);

    if (!shipment) {
        alert("Tracking ID Not Found");
        return;
    }

    shipment.status = newStatus;

    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );

    alert("Status Updated Successfully");

    trackShipment();

    loadDashboardStats();

    if (typeof loadShipments === "function") {
        loadShipments();
    }
}
function logout() {
    sessionStorage.clear();

    window.location.href = "login.html";
}
function searchTracking() {

    let filter =
        document.getElementById("searchTracking")
        .value
        .toUpperCase();

    let rows =
        document.querySelectorAll("#shipmentBody tr");

    rows.forEach(row => {

        let trackingId =
            row.cells[0].innerText.toUpperCase();

        row.style.display =
            trackingId.includes(filter)
                ? ""
                : "none";
    });
}
