const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const reports = JSON.parse(localStorage.getItem('reports')) || [];
const report = reports.find(r => r.id === id);

const container = document.getElementById('detail-container');

if (!report) {
    container.innerHTML = '<p>Laporan tidak ditemukan.</p>';
} else {
    container.innerHTML = `
        <div class="card shadow-sm">
            ${report.image ? `<img src="${report.image}" class="card-img-top" alt="Foto Fasilitas" style="max-height: 400px; object-fit: cover;">` : ''}
            <div class="card-body">
                <h2>${report.name}</h2>
                <p><strong>Status:</strong> 
                    <span class="badge bg-${report.status === 'Selesai' ? 'success' : report.status === 'Diproses' ? 'warning' : 'secondary'}">
                        ${report.status}
                    </span>
                </p>
                <p><strong>Tanggal:</strong> ${report.date}</p>
                <p><strong>Deskripsi:</strong></p>
                <p>${report.description}</p>
                <div class="mt-4">
                    <a href="reports.html" class="btn btn-secondary">Kembali</a>
                    <a href="edit-report.html?id=${report.id}" class="btn btn-warning ms-2">Edit</a>
                </div>
            </div>
        </div>
    `;
}