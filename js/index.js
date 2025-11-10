 function updateDashboard() {
            const reports = JSON.parse(localStorage.getItem('reports')) || [];


            const total = reports.length;
            const baru = reports.filter(r => r.status === "Baru").length;
            const proses = reports.filter(r => r.status === "Diproses").length;
            const selesai = reports.filter(r => r.status === "Selesai").length;


            document.getElementById('totalReports').innerText = total;
            document.getElementById('newReports').innerText = baru;
            document.getElementById('processReports').innerText = proses;
            document.getElementById('doneReports').innerText = selesai;
        }


        updateDashboard();