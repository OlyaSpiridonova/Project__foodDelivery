const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

// Создание карточек получением данных с сервера, в переменной getResource Ключевое слово async ставится перед функцией при ее объявлении. Это позволяет внутри такой функции использовать другое ключевое слово — await. await же даёт возможность остановить выполнение функции, чтобы дождаться разрешения promise'а или завершения другой async-функции 

const getResource = async (url) => {
    const res = await fetch(url);
    //  throw позволяет генерировать исключения, определяемые пользователем, это необходимо для определения ошибки, которая может произойти во время выполнения функции, так как в промисах метод catch срабатывает лишь в случаях, когда отсутствует интернет и тп.(Ему не важен статус выполнения функции 404, 502 - которые указывают на неуспешное выполнение)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResource};