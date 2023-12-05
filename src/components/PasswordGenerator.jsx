import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SavedPasswordsModal from "./SavedPasswordsModal";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12); // Default length
  const [complexity, setComplexity] = useState(['uppercase', 'lowercase', 'numbers', 'special']); // Default complexity
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  
  const generatePassword = () => {
    if (complexity.length === 0) {
      // No checkboxes are selected
      toast.info('Please select at least one constraint');
      return;
    }

    if (length < 6) {
      // Password length is less than 6 characters
      setError('Password length must be at least 6 characters');
      toast.error('Password length must be at least 6 characters');
      return;
    }

    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      special: '!@#$%^&*()_+[]{}|;:,.<>?',
    };

    let newPassword = '';
    let totalCharset = '';

    complexity.forEach((type) => {
      totalCharset += charset[type];
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * totalCharset.length);
      newPassword += totalCharset[randomIndex];
    }

    setPassword(newPassword);
    setError(''); // Clear any previous error
  };

  const handleComplexityChange = (value) => {
    if (complexity.includes(value)) {
      setComplexity(complexity.filter((item) => item !== value));
    } else {
      setComplexity([...complexity, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCopied(false); // Prevent the default form submission behavior
    generatePassword(); // Call the generatePassword function when the form is submitted
  };

  const copyToClipboard = () => {
    const passwordInput = document.createElement('input');
    passwordInput.value = password;
    document.body.appendChild(passwordInput);
    passwordInput.select();
    document.execCommand('copy');
    document.body.removeChild(passwordInput);
    setIsCopied(true);
    toast.success("Copied to clipboard")
  };

  const savePassword = () => {
    if (password) {
      // Check if the password is already in the savedPasswords array
      if (!savedPasswords.includes(password)) {
        // If it's not a duplicate, add it to the savedPasswords state
        setSavedPasswords([...savedPasswords, password]);
        toast.success("Password saved")
      } else {
        // Handle duplicate password error here (e.g., show a message)
        setError('Password already saved');
        toast.error("Password already saved")
      }
    } else {
      // Handle the case where there's no password to save (e.g., show a message)
      setError('No password to save');
    }
  };

  const clearPasswords = () => {
    const shouldClear = window.confirm("Are you sure you want to clear all saved passwords?");
    if (shouldClear) {
      setSavedPasswords([]); // Clear the saved passwords state
      setPassword('');
      setError('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#37566d]" style={{
        
      }}>
        <div className="max-w-md mx-auto p-4 border rounded-md shadow-2xl w-full bg-white opacity-90">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-md shadow-2xl w-full  bg-white opacity-90">
          <h1 className="text-2xl font-extrabold mb-4 flex justify-center items-center h-16">PassGen</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password Length:</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password Complexity:</label>
            <div className="space-y-2">
              <div className="mb-4">
                <div className="space-y-2">
                <Card>
      <List>
        <ListItem className="p-0">
          <label
            // htmlFor="vertical-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
              type="checkbox"
              value="uppercase"
              checked={complexity.includes('uppercase')}
              onChange={() => handleComplexityChange('uppercase')}

                id="vertical-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
            Uppercase
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            // htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
              type="checkbox"
              value="lowercase"
              checked={complexity.includes('lowercase')}
              onChange={() => handleComplexityChange('lowercase')}

                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
            Lowercase
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            // htmlFor="vertical-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
              type="checkbox"
              value="numbers"
              checked={complexity.includes('numbers')}
              onChange={() => handleComplexityChange('numbers')}
                id="vertical-list-svelte"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
            Numbers
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            // htmlFor="vertical-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                      type="checkbox"
                      value="special"
                      checked={complexity.includes('special')}
                      onChange={() => handleComplexityChange('special')}

                id="vertical-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
            Special Characters
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
                
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="bg-[#37566d] text-white py-2 px-4 rounded-md hover:bg-[#37566d]"
            >
              Generate Password
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Generated Password:</label>
            { password=="Password length must be at least 6 characters" ? <>
            <div className="w-full border rounded-md px-3 h-10">
              <input
                type="text"
                value=""
                readOnly
                className="w-full h-full border-none outline-none font-bold"
              />
            </div>
            
            </> : 
            <>
            <div className="w-full border rounded-md px-3 h-10">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full h-full border-none outline-none font-bold"
              />
            </div>
            </>}
            

          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
          {/* {savedPasswords ? <><ul className="list-disc pl-5">
            {savedPasswords.map((savedPassword, index) => (
              <li key={index}>{savedPassword}</li>
            ))}
          </ul> 
          </> : <> </>} */}
      </form>
            <div className="flex justify-center mt-2">
                { password && password != 'Password length must be at least 6 characters' ? <> 
                    <button
                    onClick={savePassword}
                    className="bg-[#37566d] text-white py-2 px-4 rounded-md hover:bg-[#37566d] mt-2"
                    >
                    Save Password
                    </button>

                    <button
                    onClick={copyToClipboard}
                    className="bg-[#37566d] text-white py-2 px-4 rounded-md hover:bg-[#37566d] mt-2 mx-1"
                    >
                    Copy to Clipboard
                    </button>

                    {savedPasswords.length!=0 ? <> <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#37566d] text-white py-2 px-4 rounded-md hover:bg-[#37566d] mt-2"
          >
            My Passwords
          </button></> : <></>}
                    </> : <>
                    </>
                    }
            </div>
        </div>
        <SavedPasswordsModal
          open={isModalOpen}
          handleOpen={() => setIsModalOpen(false)}
          savedPasswords={savedPasswords}
          clearPasswords={clearPasswords}
          onClose={() => setIsModalOpen(false)} // Pass the clearPasswords function
        />   
        <ToastContainer 
        autoClose={1500}
        closeOnClick
        draggable
        />
    </div>
  );
};

export default PasswordGenerator;
