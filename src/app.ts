import express, { NextFunction, Request, Response } from "express";

const app: express.Application = express();

type Book = {
    id: number;
    authors: string[];
    title: string;
};

let books: Book[] = [
    {
        id: 1,
        authors: ["Jonathan Haidt"],
        title: "Coddling of the American Mind",
    },
    {
        id: 2,
        authors: ["Dan Heath", "Chip Heath"],
        title: "Switch: How to change when change is hard",
    },
    { id: 3, authors: ["Kathy Sierra"], title: "Badass: Making users awesome" },
    {
        id: 4,
        authors: ["Daniel Kahneman"],
        title: "Thinking fast, thinking slow",
    },
    { id: 5, authors: ["Caroline Dweck"], title: "Mindset" },
    { id: 6, authors: ["Michael Walker"], title: "Why we sleep?" },
];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    const name = "Wojtek";
    res.send(`Hello ${name}!`);
});

app.get("/books", (req: Request, res: Response) => {
    res.status(200).json(books);
});

app.post("/books", (req: Request, res: Response) => {
    const body = req.body;

    books.push(body);

    res.sendStatus(201);
});

app.get("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    res.status(200).json(books.filter((book) => book.id === id));
});

app.put("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body = req.body;

    books = books.map((book) => (book.id === id ? body : book));

    res.sendStatus(202);
});

app.delete("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    books = books.filter((book) => book.id !== id);

    res.sendStatus(202);
});

export default app;
