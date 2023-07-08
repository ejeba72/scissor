import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    console.log(`Server is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});