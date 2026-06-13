'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/*В данном примере видим "44 -> 11 -> 22 -> 33", так как обработчики "then()" все равно регистрируются и пробрасывают 
ошибку дальше в обработчики "catch()".

Порядок работы кода такой - 
1. Выполняется синхронный код в рамках первой макрозадачи.
1.1 Создается константа "promise_001".
1.2 Запускается оператор присваивания.
1.3 Оператор присваивания встает на паузу, чтобы запустился выполняемый код справа от него, так как оператор пока не 
понимает, что нужно присвоить в константу "promise_001".
1.4 Запускается конструктор "new Promise()".
1.5 Конструктор "new Promise()" создает новый промис в состоянии pending.
1.6 Конструктор "new Promise" встает на паузу, чтобы запустить функцию-executor из параметров.
1.7 Запускается функция-executor.
1.8 Во время работы функции-executor запускается функция "reject()".
1.9 Функция "reject()" переводит созданый промис в состояние rejected.
1.10 Функция-executor завершает свою работу, выполнение кода передается обратно конструктору "new Promise".
1.11 Конструктор "new Promise" возвращает созданный промис в состоянии rejected и завершает свою работу, передавая 
управление кода обратно оператору присваивания.
1.12 Оператор присваивания присваивает созданный промис в состоянии rejected в константу "promise_001" и завершает свою 
работу.

1.13 Далее переходим к выполнению второй строки и выполняются теже шаги, что и для первой строки.

1.14 Далее регистрируем первый then-обработчик "handler_then#1_for_promise_001" для промиса "promise_001" и отправляем в
очередь микрозадач микрозадачу "then#1_for_promise_001", так как промис "promise_001" находится в состоянии rejected.
1.15 Этот then-обработчик создает новый промис в состоянии pending, назовем его "promise_A".
1.16 Регистрируем первый catch-обработчик "handler_catch#1_for_promise_A" для промиса "promise_A", но не добавляем 
никаких микрозадач в очередь микрозадач, так как промис "promise_A" находится в состоянии pending.
1.17 Этот catch-обработчик создает новый промис в состоянии pending, назовем его "promise_AA".

1.18 Далее регистрируем второй then-обработчик "handler_then#2_for_promise_001" для промиса "promise_001" и отправляем в
очередь микрозадач микрозадачу "then#2_for_promise_001", так как промис "promise_001" находится в состоянии rejected.
1.19 Этот then-обработчик создает новый промис в состоянии pending, назовем его "promise_B".
1.20 Регистрируем второй catch-обработчик "handler_catch#2_for_promise_B" для промиса "promise_B", но не добавляем 
никаких микрозадач в очередь микрозадач, так как промис "promise_B" находится в состоянии pending.
1.21 Этот catch-обработчик создает новый промис в состоянии pending, назовем его "promise_BB".

1.22 Далее регистрируем третий then-обработчик "handler_then#3_for_promise_001" для промиса "promise_001" и отправляем в 
очередь микрозадач микрозадачу "then#3_for_promise_001", так как промис "promise_001" находится в состоянии rejected.
1.23 Этот then-обработчик создает новый промис в состоянии pending, назовем его "promise_C".
1.24 Регистрируем третий catch-обработчик "handler_catch#3_for_promise_C" для промиса "promise_C", но не добавляем 
никаких микрозадач в очередь микрозадач, так как промис "promise_C" находится в состоянии pending.
1.25 Этот catch-обработчик создает новый промис в состоянии pending, назовем его "promise_CC".

1.26 Далее регистрируем четвертый catch-обработчик "handler_catch#4_for_promise_002" для промиса "promise_002" и 
отправляем в очередь микрозадач микрозадачу "catch#4_for_promise_002", так как промис "promise_002" находится в 
состоянии rejected.
1.27 Этот catch-обработчик создает новый промис в состоянии pending, назовем его "promise_D".
1.28 Регистрируем пятый catch-обработчик "handler_catch#5_for_promise_D" для промиса "promise_D", но не добавляем 
никаких микрозадач в очередь микрозадач, так как промис "promise_D" находится в состоянии pending.
1.29 Этот catch-обработчик создает новый промис в состоянии pending, назовем его "promise_DD".

1.30 Выполнение синхронного кода заканичивается.

2. Выполняются микрозадачи.
2.1 
Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - pending.
"promise_B" - pending.
"promise_C" - pending.
"promise_D" - pending.
"promise_AA" - pending.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Список зарегистрированных обработчиков:
- then-обработчик "handler_then#1_for_promise_001" - будет смотреть на состояние промиса "promise_001", и если промис 
перейдет в состояние settled, то этот then-обработчик создаст микрозадачу "then#1_for_promise_001". В данном случае 
промис "promise_001" изначально находится в состоянии rejected, поэтому в очередь микрозадач первой добавляется 
микрозадача "then#1_for_promise_001".
- catch-обработчик "handler_catch#1_for_promise_A" - будет смотреть на состояние промиса "promise_A", и если промис 
перейдет в состояние settled, то этот catch-обработчик создаст микрозадачу "catch#1_for_promise_A".

- then-обработчик "handler_then#2_for_promise_001" - будет смотреть на состояние промиса "promise_001", и если промис 
перейдет в состояние settled, то этот then-обработчик создаст микрозадачу "then#2_for_promise_001". В данном случае 
промис "promise_001" изначально находится в состоянии rejected, поэтому в очередь микрозадач второй добавляется 
микрозадача "then#2_for_promise_001".
- catch-обработчик "handler_catch#2_for_promise_B" - будет смотреть на состояние промиса "promise_B", и если промис 
перейдет в состояние settled, то этот catch-обработчик создаст микрозадачу "catch#2_for_promise_B".

- then-обработчик "handler_then#3_for_promise_001" - будет смотреть на состояние промиса "promise_001", и если промис 
перейдет в состояние settled, то этот then-обработчик создаст микрозадачу "then#3_for_promise_001". В данном случае 
промис "promise_001" изначально находится в состоянии rejected, поэтому в очередь микрозадач третьей добавляется 
микрозадача "then#3_for_promise_001".
- catch-обработчик "handler_catch#3_for_promise_C" - будет смотреть на состояние промиса "promise_C", и если промис 
перейдет в состояние settled, то этот catch-обработчик создаст микрозадачу "catch#3_for_promise_C".

- catch-обработчик "handler_catch#4_for_promise_002" - будет смотреть на состояние промиса "promise_002", и если промис 
перейдет в состояние settled, то этот catch-обработчик создаст микрозадачу "catch#4_for_promise_002". В данном случае 
промис "promise_002" изначально находится в состоянии rejected, поэтому в очередь микрозадач четвертой добавляется 
микрозадача "catch#4_for_promise_002".
- catch-обработчик "handler_catch#5_for_promise_D" - будет смотреть на состояние промиса "promise_D", и если промис 
перейдет в состояние settled, то этот catch-обработчик создаст микрозадачу "catch#5_for_promise_D".

Очередь микрозадач:
"then#1_for_promise_001".
"then#2_for_promise_001".
"then#3_for_promise_001".
"catch#4_for_promise_002".

2.2 Выполняется микрозадача "then#1_for_promise_001" - поскольку промис "promise_001" находится в состоянии rejected, то 
это состояние передается в дочерний промис "promise_A", который также переходит в состояние rejected, что влечет за 
собой добавление микрозадачи "catch#1_for_promise_A" в очередь микрозадач catch-обработчиком 
"handler_catch#1_for_promise_A".

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - pending.
"promise_C" - pending.
"promise_D" - pending.
"promise_AA" - pending.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"then#2_for_promise_001".
"then#3_for_promise_001".
"catch#4_for_promise_002".
"catch#1_for_promise_A".

2.3 Выполняется микрозадача "then#2_for_promise_001" - поскольку промис "promise_001" находится в состоянии rejected, то 
это состояние передается в дочерний промис "promise_B", который также переходит в состояние rejected, что влечет за 
собой добавление микрозадачи "catch#2_for_promise_B" в очередь микрозадач catch-обработчиком 
"handler_catch#2_for_promise_B".

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - pending.
"promise_D" - pending.
"promise_AA" - pending.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"then#3_for_promise_001".
"catch#4_for_promise_002".
"catch#1_for_promise_A".
"catch#2_for_promise_B".

2.4 Выполняется микрозадача "then#3_for_promise_001" - поскольку промис "promise_001" находится в состоянии rejected, то 
это состояние передается в дочерний промис "promise_C", который также переходит в состояние rejected, что влечет за 
собой добавление микрозадачи "catch#3_for_promise_C" в очередь микрозадач catch-обработчиком 
"handler_catch#3_for_promise_C".

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - pending.
"promise_AA" - pending.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"catch#4_for_promise_002".
"catch#1_for_promise_A".
"catch#2_for_promise_B".
"catch#3_for_promise_C".

2.5 Выполняется микрозадача "catch#4_for_promise_002" - поскольку промис "promise_002" находится в состоянии rejected, 
то выполняется callback-функция из параметров - в консоль выводится 44. Далее catch-обработчик 
"handler_catch#4_for_promise_002" пробрасывает undefined, а не ошибку, в виде успешного ответа в дочерний промис 
"promise_D", который переходит в состояние fulfilled. Далее, поскольку промис "promise_D" перешел в состояние settled, 
то catch-обработчик "handler_catch#5_for_promise_D" добавляет микрозадачу "catch#5_for_promise_D" в очередь микрозадач.

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - fulfilled.
"promise_AA" - pending.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"catch#1_for_promise_A".
"catch#2_for_promise_B".
"catch#3_for_promise_C".
"catch#5_for_promise_D".

В консоли: 44.

2.6 Выполняется микрозадача "catch#1_for_promise_A" - поскольку промис "promise_A" находится в состоянии rejected, то 
выполняется callback-функция из параметров - в консоль выводится 11. Далее catch-обработчик 
"handler_catch#1_for_promise_A" пробрасывает undefined, а не ошибку, в виде успешного ответа в дочерний промис 
"promise_AA", который переходит в состояние fulfilled.

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - fulfilled.
"promise_AA" - fulfilled.
"promise_BB" - pending.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"catch#2_for_promise_B".
"catch#3_for_promise_C".
"catch#5_for_promise_D".

В консоли: 44 -> 11.

2.7 Выполняется микрозадача "catch#2_for_promise_B" - поскольку промис "promise_B" находится в состоянии rejected, то 
выполняется callback-функция из параметров - в консоль выводится 22. Далее catch-обработчик 
"handler_catch#2_for_promise_B" пробрасывает undefined, а не ошибку, в виде успешного ответа в дочерний промис 
"promise_BB", который переходит в состояние fulfilled.

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - fulfilled.
"promise_AA" - fulfilled.
"promise_BB" - fulfilled.
"promise_CC" - pending.
"promise_DD" - pending.

Очередь микрозадач:
"catch#3_for_promise_C".
"catch#5_for_promise_D".

В консоли: 44 -> 11 -> 22.

2.8 Выполняется микрозадача "catch#3_for_promise_C" - поскольку промис "promise_C" находится в состоянии rejected, то 
выполняется callback-функция из параметров - в консоль выводится 33. Далее catch-обработчик 
"handler_catch#3_for_promise_C" пробрасывает undefined, а не ошибку, в виде успешного ответа в дочерний промис 
"promise_CC", который переходит в состояние fulfilled.

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - fulfilled.
"promise_AA" - fulfilled.
"promise_BB" - fulfilled.
"promise_CC" - fulfilled.
"promise_DD" - pending.

Очередь микрозадач: 
"catch#5_for_promise_D".

2.9 Выполняется микрозадача "catch#5_for_promise_D" - поскольку промис "promise_D" находится в состоянии fulfilled, то 
catch-обработчик "handler_catch#5_for_promise_D" пробрасывает undefined, а не ошибку, в виде успешного ответа в дочерний
промис "promise_DD", который переходит в состояние fulfilled.

Состояния промисов:
"promise_001" - rejected.
"promise_002" - rejected.
"promise_A" - rejected.
"promise_B" - rejected.
"promise_C" - rejected.
"promise_D" - fulfilled.
"promise_AA" - fulfilled.
"promise_BB" - fulfilled.
"promise_CC" - fulfilled.
"promise_DD" - fulfilled.

Очередь микрозадач: пустая.

В консоли: 44 -> 11 -> 22 -> 33.

3. Конец выполнения программы.*/
const promise_001 = new Promise(((resolve, reject) => reject()));
const promise_002 = new Promise(((resolve, reject) => reject()));

promise_001
    .then(() => console.log(1))
    .catch(() => console.log(11));

promise_001
    .then(() => console.log(2))
    .catch(() => console.log(22));

promise_001
    .then(() => console.log(3))
    .catch(() => console.log(33));

promise_002
    .catch(() => console.log(44))
    .catch(() => console.log(55));