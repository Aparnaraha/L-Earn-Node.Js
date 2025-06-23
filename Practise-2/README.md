Bilkul! Yahan aapke diye hue content ke basis par ek clean, formatted **README.md** file ka code diya hai jo aap apne Node.js project ke liye use kar sakte hain:

````markdown
# 🚀 Node.js Sikho – Day 2 (Hinglish + Easy Explanation with Scripts)

Welcome back dosto! Yeh **Day 2** hai Node.js learning journey ka.  
Aaj hum kuch important core modules aur file system ke sath kaam karenge, aur har topic ka ek chhota code example bhi dekhenge.

---

## 📚 Aaj Hum Kya Seekhenge?

- [x] Core Module: `path`  
- [x] File System Module: `fs`  
- [x] Sync vs Async (Simple Samjhaav)  
- [x] Ek Mini Project: Log Writer  
- [x] Practice Task: Text Transform (Uppercase)  

---

## 📦 1. Core Module – `path`

### 🧠 Explanation:  
`path` module Node.js ka built-in module hai jo file/folder ke paths ke sath kaam karta hai.  
Iska use hum file ka extension, file ka naam ya folder ka path nikalne ke liye karte hain.

### 📄 Code Example: `path-example.js`

```js
const path = require('path');

const filePath = '/users/john/documents/file.txt';

console.log('📁 Folder:', path.dirname(filePath));
console.log('📄 File Name:', path.basename(filePath));
console.log('🧩 Extension:', path.extname(filePath));
````

---

## 📁 2. File System Module – `fs`

### 🧠 Explanation:

`fs` (File System) module se hum Node.js me files ko read, write, aur update kar sakte hain.
Yeh synchronous (blocking) aur asynchronous (non-blocking) dono tareeke support karta hai.

---

### (a) File Read – Async

### 📄 Code Example: `fs-read.js`

```js
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('📄 File content:', data);
});
```

> 📌 Make sure `example.txt` file aapke folder me ho aur usme kuch text likha ho.

---

### (b) File Write – Naya file banana ya overwrite karna

### 📄 Code Example: `fs-write.js`

```js
const fs = require('fs');

fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('✅ File save ho gaya!');
});
```

> 📌 Ye file `output.txt` create karega ya agar already exist kare toh usko overwrite karega.

---

### (c) File Append – Existing file me naya content add karna

### 📄 Code Example: `fs-append.js`

```js
const fs = require('fs');

fs.appendFile('output.txt', '\nYeh naya line hai.', (err) => {
  if (err) throw err;
  console.log('🆗 Text add ho gaya!');
});
```

> 📌 Ye `output.txt` ke end me naya line add karega bina purani content ko delete kiye.

---

## 🔄 3. Sync vs Async

### 🧠 Explanation:

Node.js asynchronous nature ke liye famous hai. Par kabhi kabhi synchronous functions bhi use hote hain.

* **Synchronous (Sync):** Jab tak kaam complete na ho, agla code execute nahi hota. (Blocking)
* **Asynchronous (Async):** Kaam background me hota hai, aur agla code chalta rehta hai. (Non-blocking)

### 📄 Code Example: `fs-sync-vs-async.js`

```js
const fs = require('fs');

// Sync Read
const data = fs.readFileSync('example.txt', 'utf8');
console.log('📤 Sync Data:', data);

// Async Read
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('📤 Async Data:', data);
});
```

> 📌 Sync version pehle file read karega, tabhi agla code chalega. Async version background me chalta hai.

---

## 🛠️ 4. Mini Project – Log Writer

### 🧠 Explanation:

Ye project har baar run hone par ek `log.txt` file me ek naya timestamp entry karega.
Jaise kisi diary me har din ka entry karte ho.

### 📄 Code Example: `log-writer.js`

```js
const fs = require('fs');

const log = `🕒 Log Entry: ${new Date().toISOString()}\n`;

fs.appendFile('log.txt', log, (err) => {
  if (err) throw err;
  console.log('📌 Log save ho gaya!');
});
```

> 📌 Har baar jab script chalega, ek naya line add hoga `log.txt` me.

---

## 🔤 5. Practice Task – Text Transform (Uppercase)

### 🧠 Explanation:

Ek file `input.txt` me jo bhi text hoga, usko read karke uppercase me convert karna hai
aur fir output `output.txt` me save karna hai.

### 📄 Code Example: `text-transform.js`

```js
const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }

  const upperText = data.toUpperCase();

  fs.writeFile('output.txt', upperText, (err) => {
    if (err) throw err;
    console.log('✅ Uppercase text output.txt me save ho gaya!');
  });
});
```

> 📌 `input.txt` file me kuch likh ke rakho, fir ye script chalake dekho.

---

**Bas dosto, aaj itna hi! Practice karte raho, questions ho toh poochte raho. Happy Coding! 🚀**

---

> Aap isko poora ek file me rakh sakte ho. Koi alag se alag files ki zarurat nahi, sab ek hi jagah nicely explain ho gaya hai.
> Chahe aap is README.md ko GitHub pe dal do, ya apne local project me rakho — easily samajh aayega aur use bhi ho jayega!
> Koi aur help chahiye toh batao!

```

---

Aap is README.md ko apne project ke root folder me save kar dijiye, aur ye beginners ke liye bahut helpful rahega samajhne ke liye ki Node.js ke basic file handling modules kaise use karte hain.

Kya aapko isme koi aur addition chahiye ya koi aur help chahiye?
```
