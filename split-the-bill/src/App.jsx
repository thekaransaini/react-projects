import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p>
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p>
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance == 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input type="text"></input>
      <label>🖼️ Image URL</label>
      <input type="text"></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH FRIEND</h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>👦 Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 Friend's expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
