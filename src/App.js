import { useEffect, useState } from 'react';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/users');
                const data = await res.json();

                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };

        loadUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;

        const user = { name, email };

        // console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => setUsers([...users, data]))
            .catch((err) => console.log(err));

        e.target.reset();
    };

    console.log(users);

    return (
        <div className="max-w-[360px] md:max-w-3xl lg:max-w-6xl mx-auto my-14">
            <form
                onSubmit={handleSubmit}
                className="max-w-md p-4 mx-auto space-y-3 bg-gray-100 rounded-lg shadow-sm"
            >
                <input
                    className="w-full px-5 py-2 font-semibold border rounded-lg shadow-sm outline-green-700"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <br />
                <input
                    className="w-full px-5 py-2 font-semibold border rounded-lg shadow-sm outline-green-700"
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                <br />
                <button
                    className="w-full py-2 font-semibold text-white bg-green-700 rounded-lg shadow-sm shadow-green-700"
                    type="submit"
                >
                    Add User
                </button>
            </form>
            <h1 className="text-2xl font-bold">Total {users.length} users</h1>
            <div className="grid grid-cols-1 gap-5 my-10 md:grid-cols-3">
                {users.map((user) => (
                    <div
                        className="p-4 space-y-3 bg-gray-100 rounded-lg shadow-sm"
                        key={user._id}
                    >
                        <p className="text-xl font-semibold text-gray-900">
                            {user.name}
                        </p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
