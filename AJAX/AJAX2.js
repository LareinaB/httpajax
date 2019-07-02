let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
    // 2 3 4
};
xhr.open('get', 'temp.json', false);
xhr.send(null);


