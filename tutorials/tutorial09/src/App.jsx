import React from "react";
import Profile from  "./Profile.jsx";
import Card from "./components/Card";
import { Image, Button, Checkbox } from 'antd';
import AntCard from "./components/AntCard"

export default function App() {

    return (
    <>
        <Card
         name="Cute Puppy"
        image_url="https://picsum.photos/id/237/400/300"
        description="Perfect example of puppy eyes."/>
        <Card
         name="Mountain top"
        image_url="https://picsum.photos/seed/picsum/200/300"
        description="Cold snow"/>
        <Image
        width={200}
        alt="basic"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
    
         <AntCard
         name="hazy"
        image_url="https://picsum.photos/id/100/400/300"
        description="beach" />

        <Button type="primary"> Click Here!</Button>
        <Checkbox>Strongly agree</Checkbox>
    
    </>

    );
}