document.getElementById('convertBtn').addEventListener('click', async () => {
    const file = document.getElementById('upload').files[0];
    if (!file) return alert("เลือกไฟล์ก่อนครับ");

    const reader = new FileReader();
    reader.onload = async function(e) {
        const result = await mammoth.convertToHtml({arrayBuffer: e.target.result});
        
        // สร้าง Div ชั่วคราวเพื่อแสดงผล HTML
        const div = document.createElement('div');
        div.innerHTML = result.value;
        div.style.padding = "20px";
        div.style.width = "500px";
        div.style.background = "white";
        document.body.appendChild(div);

        // ใช้ html2canvas เรนเดอร์เป็นรูปภาพแล้วลง PDF
        html2canvas(div).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
            pdf.save("converted.pdf");
            document.body.removeChild(div);
        });
    };
    reader.readAsArrayBuffer(file);
});