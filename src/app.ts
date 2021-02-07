import express from "express";

export interface Book {
    id: number,
    authors: string[],
    title: string,
}

let books: Book[] = [
    {
        id: 1,
        authors: ['Jonathan Haidt'],
        title: 'Coddling of the American Mind',
    },
    {
        id: 2,
        authors: ['Dan Heath', 'Chip Heath'],
        title: 'Switch: How to change when change is hard',
    },
    {
        id: 3,
        authors: ['Kathy Sierra'],
        title: 'Badass: Making users awesome'
    },
    {
        id: 4,
        authors: ['Daniel Kahneman'],
        title: 'Thinking fast, thinking slow',
    },
    {
        id: 5,
        authors: ['Caroline Dweck'],
        title: 'Mindset'
    },
    {
        id: 6,
        authors: ['Michael Walker'],
        title: 'Why we sleep?'
    },
];

const app = express();
const PORT = 3001;

app.use(express.json());
app.get('/books', function (req, res) {
    res.json(books);
});

app.post('/books', function (req, res) {
    const book: Book = {
        id: books.length + 1,
        authors: req.body.authors,
        title: req.body.title
    }
    books.push(book);
    res.sendStatus(201);
});

app.get('/books/:id', function (req, res) {
    let find = books.find(book => book.id === parseInt(req.params.id));
    res.json(find);
});

app.put('/books/:id', (req, res) => {
    let index = books.findIndex(book => book.id === parseInt(req.params.id));
    books[index] = {
        id: books[index].id,
        authors: req.body.authors,
        title: req.body.title
    }
    res.sendStatus(202);
});

app.delete('/books/:id', function (req, res) {
    const idx = books.findIndex(element => element.id === Number(req.params.id));
    books.splice(idx, 1);
    res.sendStatus(201);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
