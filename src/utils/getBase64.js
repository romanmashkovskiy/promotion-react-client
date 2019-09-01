export default (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({
        name: file.name,
        base64: reader.result
    });
    reader.onerror = error => reject(error);
});