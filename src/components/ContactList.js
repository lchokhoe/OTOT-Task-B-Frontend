import { useState } from "react";
import axios from "axios";
import { FRONTEND_URL } from "../configs";
export default function ContactList() {
  const [newName, setNewName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [newGender, setNewGender] = useState(null);
  const [newId, setNewId] = useState(null);
  const [isContactList, setIsContactList] = useState(true);
  const [contacts, setContacts] = useState([]);

  const handleDeleteContact = async (idx) => {
    const newContacts = [...contacts];
    const targetId = newContacts[idx].id;
    newContacts.splice(idx, 1);
    setContacts(newContacts);
    const res = await axios
      .delete(`${FRONTEND_URL}/${targetId}`, {})
      .catch((err) => {
        console.log("Delete contact failed!");
        return;
      });
    if (res.data.message === "Failed to delete from database") {
      setContacts([
        {
          name: "Please try again!",
          email: "Please try again!",
          phone: "Please try again!",
          gender: "Please try again!",
        },
      ]);
    } else {
    }
  };

  const handleUpdateContact = async (idx) => {
    const newContacts = [...contacts];
    const targetId = newContacts[idx].id;
    const targetName = newName;
    const targetEmail = newEmail;
    const targetPhone = newPhone;
    const targetGender = newGender;
    const res = await axios
      .put(`${FRONTEND_URL}/${targetId}`, {
        name: targetName,
        email: targetEmail,
        phone: targetPhone,
        gender: targetGender,
      })
      .catch((err) => {
        console.log("Update contact failed!");
        return;
      });
    console.log(res);
    if (res.data.message === "Failed to update to database") {
      setContacts([
        {
          name: "Update failed!",
          email: "Please make sure you input an email!",
          phone: "Update failed!",
          gender: "Update failed!",
        },
      ]);
    } else {
      setContacts([
        {
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          gender: res.data.data.gender,
          id: res.data.data._id,
        },
      ]);
    }
  };

  const getContactsToRender = () => {
    if (isContactList) {
      return contacts.map((contact, idx) => {
        return (
          <div className="columns contact p-3 mt-3">
            <div className="column has-text-left">
              <div key={idx}>
                {contact.name}
                <h1>{contact.email}</h1>
                <h2>{contact.phone}</h2>
                <h3>{contact.gender}</h3>
                <h4>{contact.id}</h4>
              </div>
            </div>
            <div className="column is-narrow">
              <div className="buttons">
                <button
                  className="button is-success"
                  onClick={() => handleUpdateContact(idx)}
                >
                  Update
                </button>
                <button
                  className="button is-danger"
                  onClick={() => handleDeleteContact(idx)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return contacts.map((contact, idx) => {
        return (
          <div className="columns contact p-3 mt-3">
            <div className="column has-text-left">
              <div key={idx}>
                {contact.name}
                <h1>{contact.email}</h1>
                <h2>{contact.phone}</h2>
                <h3>{contact.gender}</h3>
                <h4>{contact.id}</h4>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  const handleNameChanged = (_event) => {
    setNewName(_event.target.value);
  };

  const handleEmailChanged = (_event) => {
    setNewEmail(_event.target.value);
  };

  const handlePhoneChanged = (_event) => {
    setNewPhone(_event.target.value);
  };

  const handleGenderChanged = (_event) => {
    setNewGender(_event.target.value);
  };

  const handleIdChanged = (_event) => {
    setNewId(_event.target.value);
  };

  const handleGetAllContact = async () => {
    const res = await axios.get(`${FRONTEND_URL}/`, {}).catch((err) => {
      console.log("Get all contact failed!");
      return;
    });
    if (res.data.message === "Failed to retrieve all from database") {
      setContacts([
        {
          name: "Please try again!",
          email: "Please try again!",
          phone: "Please try again!",
          gender: "Please try again!",
        },
      ]);
    } else {
      const newContactList = [];
      for (var key in res.data.data) {
        const temp = {
          name: res.data.data[key].name,
          email: res.data.data[key].email,
          phone: res.data.data[key].phone,
          gender: res.data.data[key].gender,
          id: res.data.data[key]._id,
        };
        newContactList.push(temp);
      }
      setIsContactList(true);
      setContacts(newContactList);
    }
  };

  const handleGetContact = async () => {
    const targetId = newId;
    const res = await axios
      .get(`${FRONTEND_URL}/${targetId}`, {})
      .catch((err) => {
        console.log("Get specific contact failed!");
        return;
      });
    if (res.data.message === "Failed to retrieve from database") {
      setContacts([
        {
          name: "Please make sure id is valid!",
          email: "Please make sure id is valid!",
          phone: "Please make sure id is valid!",
          gender: "Please make sure id is valid!",
        },
      ]);
    } else {
      setContacts([
        {
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          gender: res.data.data.gender,
          id: res.data.data._id,
        },
      ]);
    }
  };

  const handlePostContact = async () => {
    const targetName = newName;
    const targetEmail = newEmail;
    const targetPhone = newPhone;
    const targetGender = newGender;
    const res = await axios
      .post(`${FRONTEND_URL}`, {
        name: targetName,
        email: targetEmail,
        phone: targetPhone,
        gender: targetGender,
      })
      .catch((err) => {
        console.log("Post contact failed!");
        return;
      });
    if (res.data.message === "Failed to post to database") {
      setContacts([
        {
          name: "Please make sure you input a name!",
          email: "Please make sure you input an email!",
          phone: "Post failed!",
          gender: "Post failed!",
        },
      ]);
    } else {
      setContacts([
        {
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          gender: res.data.data.gender,
          id: res.data.data._id,
        },
      ]);
    }
  };

  const handleNUSMods = async () => {
    const res = await axios
      .get(
        "https://pxrs89it1i.execute-api.ap-southeast-1.amazonaws.com/staging",
        {}
      )
      .catch((error) => {
        console.log(error);
      });
    const newContactList = [];
    for (var key in res.data) {
      if (
        res.data[key].moduleCode.toLowerCase().includes(newId.toLowerCase())
      ) {
        const temp = {
          name: res.data[key].moduleCode,
          email: res.data[key].title,
        };
        newContactList.push(temp);
      }
    }
    setIsContactList(false);
    setContacts(newContactList);
  };

  return (
    <div>
      <div className="rows">
        <div className="row inputList">
          <input
            className="input name is-success mb-3"
            type="text"
            placeholder="Name is required"
            onChange={handleNameChanged}
          />
          <input
            className="input email is-success mb-3"
            type="text"
            placeholder="Email is required"
            onChange={handleEmailChanged}
          />
          <input
            className="input phone is-success mb-3"
            type="text"
            placeholder="Phone it not required"
            onChange={handlePhoneChanged}
          />
          <input
            className="input gender is-success mb-3"
            type="text"
            placeholder="Gender is not required"
            onChange={handleGenderChanged}
          />
          <input
            className="input id is-success mb-3"
            type="text"
            placeholder="id of contact or module code"
            onChange={handleIdChanged}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column getbutton">
          <button
            className="button is-dark is-large"
            onClick={handleGetContact}
          >
            Get
          </button>
        </div>
        <div className="column postbutton">
          <button
            className="button is-dark is-large"
            onClick={handlePostContact}
          >
            Post
          </button>
        </div>
        <div className="column getallbutton">
          <button
            className="button is-dark is-large"
            onClick={handleGetAllContact}
          >
            Get All
          </button>
        </div>
        <div className="column NUSModsbutton">
          <button className="button is-link is-large" onClick={handleNUSMods}>
            NUSMods
          </button>
        </div>
      </div>
      <hr />
      <div className="contactList">{getContactsToRender()}</div>
    </div>
  );
}
