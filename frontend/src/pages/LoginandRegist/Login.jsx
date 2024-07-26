import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { IoCloseCircleOutline } from "react-icons/io5";

import AuthService from "./auth.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

export default function Login() {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };    

    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(username, password).then(
            () => {
              window.location.replace('/control/dashboard');
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(resMessage);
            }
          );
        } else {
          setLoading(false);
        }
      };

      const handleClose = () => {
        window.location.replace("/");
      };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-green-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg relative">
                <div className="absolute top-2 right-2 cursor-pointer" onClick={handleClose}>
                    <IoCloseCircleOutline size={30} className="text-gray-500 hover:text-gray-700" />
                </div>
                <div className="text-center mb-10 mt-2">
                    <img src="/login.jpg" alt="image" className="mx-auto w-35 h-35 object-contain mb-6" />
                    <h1 className="font-bold sm:text-xl md:text-xl lg:text-2xl mt-2">Terminal Agendas System</h1>
                </div>
                <Form onSubmit={handleLogin} ref={form} className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>
                    <div>
                        <Input
                            type={visible ? "text" : "password"}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group text-center">
                        <Button className="w-full bg-green-500 py-2 rounded-lg rounded-xl text-primary hover:text-foreground hover:bg-green-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                        </Button>
                    </div>

                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}

                    <CheckButton className="w-full bg-green-500 hover:bg-green-800 text-white py-2 rounded-lg" ref={checkBtn} style={{ display: "none" }} />
                </Form>
            </div>
        </div>
    );
}
