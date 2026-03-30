import React from "react";
import { Card } from 'antd'


export default function AntCard({ name, image_url, description }) {
  return (
    <Card
      title={name}
      cover={<img src={image_url} alt={name} />}
      style={{ width: 300 }}
    >
      <p>{description}</p>
    </Card>
  );
}