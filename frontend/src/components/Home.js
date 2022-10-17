const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to MemoGuru!</h1>
            <h2>What is MemoGuru?</h2>
            <br />
            <p>MemoGuru allows you to intelligently train whatever you want to memorize in a card style way.</p>
            <br />
            <p>
                The advantage of Memo Guru compared to other apps: MemoGuru sets a memo level for each card and updates
                it whenever you train.
            </p>
            <br />
            <p>
                It also allows you to specifically train only cards from certain memo levels. Meaning you can train only
                new cards, only well rooted cards or anything in between.
            </p>
            <br />
            <br />
            <h2>How to start?</h2>
            <br />
            <p>
                To train with your existing cards go to <a href="/train">Train</a>.
            </p>
            <br />
            <p>
                To add or delete cards from your deck go to <a href="/cards">Cards</a>.
            </p>
            <br />
        </div>
    );
};

export default Home;
