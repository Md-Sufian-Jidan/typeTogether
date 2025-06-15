import { useEffect } from 'react'

import Box from '@mui/material/Box';

import Quill from 'quill';
import "quill/dist/quill.snow.css";

import styled from '@emotion/styled';

import { io } from "socket.io-client";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

const Component = styled.div`
background: #f5f5f5`

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const Editor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const quillServer = new Quill('#container',
            {
                theme: 'snow',
                modules: { toolbar: toolbarOptions }
            });
        quillServer.disable();
        quillServer.setText('Loading Document');
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        const socketServer = io("http://localhost:7000");
        setSocket(socketServer)
        return () => {
            socketServer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket === null || quill === null) return;
        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return;
            socket && socket.emit('send-changes', delta);
        }
        quill && quill.on("text-change", handleChange)
        return () => {
            quill && quill.off("text-change", handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (socket === null || quill === null) return;
        const handleChange = (delta) => {
            quill.updateContents(delta);
        }
        socket && socket.on("receive-changes", handleChange)
        return () => {
            socket && socket.off("receive-changes", handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (socket === null || quill === null) return;
        socket && socket.once('load-document', document => {
            quill && quill.setContents(document)
            quill && quill.enable();
        })

        socket && socket.emit('get-document', id);

    }, [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;
        const userInformation = {
            name: user?.displayName,
            email: user?.email
        };

        const saveContent = () => {
            socket.emit('save-document', {
                content: quill.getContents(),
                user: userInformation,
            });
        };

        const interval = setInterval(() => {
            saveContent();
        }, 2000);

        return () => clearInterval(interval)
    }, [quill, socket, id,user]);


    return (
        <Component>
            <Box className='container' id='container' component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            </Box>
        </Component>
    );
};

export default Editor;