# js-module-control-variant1

**Підсумкова модульна робота — JavaScript**  
Теми 1–11 · 40 балів

## Структура

| Файл | Опис |
|---|---|
| `module_control_demo.html` | Програма з усіма завданнями |
| `module_control_code.js` | Код практичних завдань |
| `module_control_answers.md` | Відповіді на тестові питання |

## Частина 1 — Відповіді (20 балів)

| 1-B | 2-C | 3-B | 4-A | 5-B |
|-----|-----|-----|-----|-----|
| 6-B | 7-B | 8-B | 9-C | 10-B |
| 11-B | 12-A | 13-B | 14-B | 15-B |
| 16-C | 17-B | 18-B | 19-B | 20-B |

## Частина 2 — Практичні завдання (20 балів)

### Завдання 1 — summarizeNumbers (5 балів)
```js
summarizeNumbers([4, 7, 2, 9])
// { count:4, sum:22, evenCount:2, max:9, category:"positive" }
```

### Завдання 2 — processProducts (5 балів)
```js
processProducts(products)
// { available:["Чай","Цукор"], totalPrice:80, cheapest:"Цукор", priceList:[...] }
```

### Завдання 3 — createApiClient (5 балів)
```js
const api = createApiClient("https://jsonplaceholder.typicode.com");
const user = await api.get("/users/1");
api.getRequestCount(); // 1
```

### Завдання 4 — Task + TodoList + DOM (5 балів)
- Клас `Task`: id, text, done, toggle()
- Клас `TodoList`: add(), remove(), getActive(), findById()
- DOM: делегування подій на `<ul>`

## Запуск

Відкрити `module_control_demo.html` у браузері.

## Demo відео

> 🎥 https://youtu.be/AdCRStFpWwM?si=RlTQCzB1sciNXHs0
