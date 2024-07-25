'use client'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookUser, Database, Home, KeyRound, LogOut, Menu, ScrollText, Settings, User } from 'lucide-react';

export default function Setting() {

  const [selectedTab, setSelectedTab] = useState('profile');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [profileImage, setProfileImage] = useState('https://github.com/shadcn.png');
  const [password, setPassword] = useState('');

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

  const handleSave = () => {
    // Implement save logic here
    alert('Profile saved successfully!');
  };

  const handlePasswordReset = () => {
    // Implement password reset logic here
    alert('Password reset successfully!');
  };

  return (
    <main className="flex flex-col gap-6 p-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />Profile Info</TabsTrigger>
          <TabsTrigger value="reset" className="gap-2">
            <KeyRound className="h-4 w-4" />Reset Password</TabsTrigger>
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
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <Input placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <Input placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User Name</label>
                    <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <Input placeholder="mm/dd/yyyy" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Present Address</label>
                    <Input placeholder="Enter your present address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                    <Input placeholder="Enter your permanent address" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <Input placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
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
              <Input type="password" placeholder="Old Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm New Password" />
              <Button className="mt-2 bg-green-500 hover:bg-green-700 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg text-primary hover:text-foreground hover:bg-green-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg" onClick={handlePasswordReset}>
                Reset
              </Button>
          </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
