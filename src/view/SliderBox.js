import React from "react";
import { Slider, InputNumber, Row, Col } from "antd";

export default ({
  onChange = () => {},
  value = 10,
  step = 1,
  min = 1,
  max = 30
}) => (
  <Row>
    <Col span={12}>
      <Slider
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        value={value}
      />
    </Col>
    <Col span={4}>
      <InputNumber
        min={min}
        max={max}
        step={step}
        style={{ marginLeft: 16 }}
        value={value}
        onChange={onChange}
      />
    </Col>
  </Row>
);
