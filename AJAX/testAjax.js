ajax({
    url: 'temp.json',
    cache: false,
    success: (result)=> {
        console.log(result);
    }
});
