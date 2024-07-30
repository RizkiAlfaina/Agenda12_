'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { KeyRound, User } from 'lucide-react';
import AuthService from '../LoginandRegist/auth.service'; // Ensure to update this import with the correct path

export default function Setting({ apiUrl }) {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Define role state
  const [profileImage, setProfileImage] = useState('https://github.com/shadcn.png');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setEmail(currentUser.email);
      setUsername(currentUser.username);
      if (currentUser.roles) {
        setRole(currentUser.roles.join(', ')); // Assuming roles is an array
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await axios.post(`${apiUrl}/updateProfile/${currentUser.id}`, {
        username,
        email,
      });

      // Update the local storage with new user data
      const updatedUser = { ...currentUser, username, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage(response.data.message);
      alert('Profile saved successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while updating the profile.');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(`${apiUrl}/reset-password`, {
        email,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      setMessage(response.data.message);
      alert('Password reset successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while resetting the password.');
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />Profile Info
          </TabsTrigger>
          <TabsTrigger value="reset" className="gap-2">
            <KeyRound className="h-4 w-4" />Reset Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="p-6 shadow-sm flex flex-col items-center -mt-2">
            <div className="flex flex-col lg:flex-row items-center lg:items-start w-full">
              <div className="flex flex-col items-center lg:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={profileImage} alt="Profile Image" />
                  <AvatarFallback>HK</AvatarFallback>
                </Avatar>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="upload-button" />
                <label htmlFor="upload-button" className="cursor-pointer">
                  <Button variant="outline">Choose Image</Button>
                </label>
              </div>
              <div className="flex flex-col flex-1 lg:ml-6 mt-6 lg:mt-0">
                <h2 className="text-xl font-bold mb-4">General Information</h2>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User Name</label>
                    <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <Input
                      value={role}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </CardContent>
                <Button className="mt-2 bg-blue-500 hover:bg-blue-700 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg text-primary hover:text-foreground hover:text-white transition transform hover:scale-105 hover:shadow-lg" onClick={handleSave}>Save</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="reset">
          <Card className="p-6 shadow-sm -mt-2">
            <CardContent className="flex flex-col gap-4">
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <Input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
              <Button className="mt-2 bg-green-500 hover:bg-green-700 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg text-primary hover:text-foreground hover:bg-green-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg" onClick={handlePasswordReset}>
                Reset
              </Button>
              {message && <p className="mt-4 text-red-500">{message}</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
