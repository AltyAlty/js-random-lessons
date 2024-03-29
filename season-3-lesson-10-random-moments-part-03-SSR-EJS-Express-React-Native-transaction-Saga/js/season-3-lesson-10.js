/*
SSR - Server Side Rendering. Он используется на сервере, чтобы в ответ на запросы пользователя получать готовый HTML. Но
сервер в данном случае не содержит все готовые HTML-страницы. Он генерирует их на своей стороне на основе полученного
запроса и информации из базы данных. Также сервер использует шаблоны. То есть сервер сначала получает клиентский запрос,
на его основе получает нужную информацию из своей базы данных, затем на основе суммарно имеющихся данных выбирает нужны
шаблон страницы, и в конце формирует готовую HTML-страницу, совмещая все указанные составляющие вместе. Далее готовая
HTML-страница отправляется клиенту, чтобы он мог ее у себя отобразить. Для реализации SSR есть большое количество
движков (шаблонизаторов), например "EJS".

Фреймворк "Express" нужен, чтобы развернуть сам сервер.

Поисковые боты лучше работают с заготовленным по шаблону HTML. То есть лучше для SEO и продвижения.
*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*
У библиотеки "React DOM" задача отрисовать JSX полученный от "React" в HTML-разметку и нативный JS. "React Native" это
некий аналог "React DOM". Задача "React Native" это тоже отрисовать JSX полученный от "React", но в разметку, которая
используется в различных устройствах (например, ios-устройства). "React Native" не превращает JSX в нативный JS. "React
Native" превращает компоненты в нативную разметку. Между "React Native" и нативной разметкой на устройстваъ есть еще
один слой, в котором могут быть JS-движки, которые выполняют JSX-код. Эти JS-движки работают параллельно с самим
приложением. В итоге получается, что благодаря "React Native" в каком-либо приложении будет отрисована нативная
разметка, а логикой управления будут заниматься упомянутые JS-движки. Для работы с "React Native" можно использовать
вспомогательные упрощающие работу фреймоворки, например, "Expo". На устройствах могут быть свои уникальный функции -
GPS, SD-карты, камеры, обработка отпечатков пальцев, NFC, уведомления. Для такого функционала "React Native" имеет
библиотеки.
*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*
Транзакция - это совокупность операций. Если в процессе транзакции одна из операций прошла не успешно, то все операции в
этой транзакции должны откатиться к исходному состоянию. То есть прежде чем подтвердить транзакицию необходимо
убедиться, чтобы все ее операции прошли успешно. Шаблон распределенных транзакций "Saga" на отвечает за это. Чаще
используется на бекэнде и БД, нежели чем на фронтэнде. Шаблон проектирования "Saga" - это способ управления
согласованностью данных между микрослужбами в сценариях распределенных транзакций. "Saga" - это последовательность
транзакций, которая обновляет каждую службу и публикует сообщение или событие для активации следующего шага транзакции.
Если шаг завершается ошибкой, "Saga" выполняет компенсирующие транзакции, которые отменяют предыдущие транзакции.
*/