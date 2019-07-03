ajax({
    url: 'temp.json',
    cache: false,
    data: {
        name: '前端',
        age: 9
    },
    success: (result)=> {
        console.log(result);
    }
});
