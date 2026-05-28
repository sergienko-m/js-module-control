// ============================================================
// Підсумкова модульна робота — JavaScript
// Частина 2. Практичні завдання
// ============================================================

// ─────────────────────────────────────────────────────────────
// Завдання 1 — summarizeNumbers
// Змінні, умови, цикли, функції
// ─────────────────────────────────────────────────────────────

/**
 * Повертає статистику по масиву чисел.
 * @param {number[]} numbers
 * @returns {{ count, sum, evenCount, max, category }}
 */
function summarizeNumbers(numbers) {
  // Крайній випадок — порожній масив
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return { count: 0, sum: 0, evenCount: 0, max: undefined, category: 'empty' };
  }

  let sum       = 0;
  let evenCount = 0;
  let max       = numbers[0];

  // Цикл для обчислень (без HOF)
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    sum += n;
    if (n % 2 === 0) evenCount++;
    if (n > max) max = n;
  }

  const category = sum > 0 ? 'positive' : 'non-positive';

  return {
    count: numbers.length,
    sum,
    evenCount,
    max,
    category,
  };
}

// Тести
console.log('=== Завдання 1 ===');
console.log(summarizeNumbers([4, 7, 2, 9]));
// { count: 4, sum: 22, evenCount: 2, max: 9, category: "positive" }
console.log(summarizeNumbers([]));
// { count: 0, sum: 0, evenCount: 0, max: undefined, category: "empty" }
console.log(summarizeNumbers([-3, -1, -2]));
// { count: 3, sum: -6, evenCount: 1, max: -1, category: "non-positive" }


// ─────────────────────────────────────────────────────────────
// Завдання 2 — processProducts
// Масиви, об'єкти, функції вищого порядку
// ─────────────────────────────────────────────────────────────

/**
 * Обробляє масив товарів і повертає статистику.
 * @param {{ name: string, price: number, inStock: boolean }[]} products
 * @returns {{ available, totalPrice, cheapest, priceList }}
 */
function processProducts(products) {
  // Крайній випадок — порожній масив
  if (!Array.isArray(products) || products.length === 0) {
    return { available: [], totalPrice: 0, cheapest: null, priceList: [] };
  }

  // Товари в наявності
  const inStockItems = products.filter(p => p.inStock === true);

  // Масив назв наявних товарів
  const available = inStockItems.map(p => p.name);

  // Сума цін наявних товарів через reduce
  const totalPrice = inStockItems.reduce((sum, p) => sum + p.price, 0);

  // Найдешевший серед наявних
  const cheapest = inStockItems.length
    ? inStockItems.reduce((min, p) => p.price < min.price ? p : min).name
    : null;

  // Прайс-лист всіх товарів через map
  const priceList = products.map(p => `${p.name} — ${p.price} грн`);

  return { available, totalPrice, cheapest, priceList };
}

// Тести
console.log('\n=== Завдання 2 ===');
const products = [
  { name: 'Чай',   price: 50,  inStock: true  },
  { name: 'Кава',  price: 120, inStock: false },
  { name: 'Цукор', price: 30,  inStock: true  },
];
console.log(processProducts(products));
// { available: ["Чай","Цукор"], totalPrice: 80, cheapest: "Цукор", priceList: [...] }
console.log(processProducts([]));
// { available: [], totalPrice: 0, cheapest: null, priceList: [] }


// ─────────────────────────────────────────────────────────────
// Завдання 3 — createApiClient
// Замикання + async/await + fetch
// ─────────────────────────────────────────────────────────────

/**
 * Створює API клієнт із базовим URL та лічильником запитів.
 * @param {string} baseUrl
 * @returns {{ get(path): Promise, getRequestCount(): number }}
 */
function createApiClient(baseUrl) {
  // Приватний лічильник у замиканні
  let requestCount = 0;

  return {
    /**
     * Виконує GET запит до baseUrl + path.
     * @param {string} path
     * @returns {Promise<object>}
     */
    async get(path) {
      requestCount++; // збільшуємо лічильник при кожному виклику
      try {
        const response = await fetch(baseUrl + path);

        // Перевіряємо HTTP статус
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        // Парсимо JSON
        const data = await response.json();
        return data;

      } catch (error) {
        // Повертаємо об'єкт помилки замість throw
        return { error: 'Запит не вдався' };
      }
    },

    /**
     * Повертає кількість виконаних запитів.
     * @returns {number}
     */
    getRequestCount() {
      return requestCount;
    },
  };
}

// Тест (запускати в браузері або Node.js з fetch)
console.log('\n=== Завдання 3 ===');
async function testApiClient() {
  const api = createApiClient('https://jsonplaceholder.typicode.com');
  const user  = await api.get('/users/1');
  const posts = await api.get('/posts/1');
  console.log('User:', user.name);
  console.log('Post:', posts.title);
  console.log('Запитів:', api.getRequestCount()); // 2
}
testApiClient();


// ─────────────────────────────────────────────────────────────
// Завдання 4 — Task + TodoList (логіка без DOM)
// Класи, ООП
// ─────────────────────────────────────────────────────────────

/**
 * Клас одного завдання
 */
class Task {
  constructor(id, text) {
    this.id   = id;
    this.text = text;
    this.done = false; // за замовчуванням false
  }

  /** Інвертує стан done */
  toggle() {
    this.done = !this.done;
    return this.done;
  }
}

/**
 * Клас списку завдань
 */
class TodoList {
  #tasks  = [];
  #nextId = 1;

  /**
   * Додає нове завдання
   * @param {string} text
   * @returns {Task}
   */
  add(text) {
    if (!text || !text.trim()) throw new Error('Текст завдання не може бути порожнім');
    const task = new Task(this.#nextId++, text.trim());
    this.#tasks.push(task);
    return task;
  }

  /**
   * Видаляє завдання за id
   * @param {number} id
   */
  remove(id) {
    const idx = this.#tasks.findIndex(t => t.id === id);
    if (idx === -1) throw new Error(`Завдання з id=${id} не знайдено`);
    this.#tasks.splice(idx, 1);
  }

  /**
   * Повертає незавершені завдання
   * @returns {Task[]}
   */
  getActive() {
    return this.#tasks.filter(t => !t.done);
  }

  /**
   * Повертає всі завдання (копія)
   * @returns {Task[]}
   */
  getAll() {
    return [...this.#tasks];
  }

  /**
   * Знайти завдання за id
   * @param {number} id
   * @returns {Task|undefined}
   */
  findById(id) {
    return this.#tasks.find(t => t.id === id);
  }
}

// Тести
console.log('\n=== Завдання 4 ===');
const todo = new TodoList();
todo.add('Вивчити JavaScript');
todo.add('Зробити практичну');
todo.add('Здати модульну');

console.log('Всі:', todo.getAll().map(t => t.text));
todo.findById(1).toggle();
console.log('Активні:', todo.getActive().map(t => t.text));
todo.remove(2);
console.log('Після видалення:', todo.getAll().map(t => t.text));
