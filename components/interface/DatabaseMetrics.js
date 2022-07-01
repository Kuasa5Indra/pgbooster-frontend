import {Col, Form, Row} from "react-bootstrap";
import dateFormat from "dateformat";
import {useState} from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import api from "../../utils/api";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const fetcher = url => api.get(url).then(res => res.data)

const DatabaseMetrics = () => {
    const [startDate, setStartDate] = useState(dateFormat(new Date(), 'isoDate'));
    const [startTime, setStartTime] = useState(dateFormat(new Date().setHours(new Date().getHours(), 0, 0), 'isoTime'));
    const [endDate, setEndDate] = useState(dateFormat(new Date(), 'isoDate'));
    const [endTime, setEndTime] = useState(dateFormat(new Date(), 'isoTime'));
    const [period, setPeriod] = useState(300);
    const yAxis = ['Count', 'Percent', 'Bytes', 'Bytes', 'Count/Second', 'Count/Second'];
    const { data: metrics } = useSWR(`/metrics/db?start=${startDate.concat(' ' + startTime)}&end=${endDate.concat(' ' + endTime)}&period=${period}`, fetcher);

    return (
        <>
            <Row>
                <Col lg={4} md={6} sm={12}>
                    <Row>
                        <Col lg={6} md={12}>
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    name="start-date"
                                    type="date"
                                    onBlur={(event) => setStartDate(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={12}>
                            <Form.Group>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control
                                    name="start-time"
                                    type="time"
                                    step="1"
                                    onBlur={(event) => setStartTime(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <Row>
                        <Col lg={6} md={12}>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    name="end-date"
                                    type="date"
                                    onBlur={(event) => setEndDate(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={12}>
                            <Form.Group>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control
                                    name="end-time"
                                    type="time"
                                    step="1"
                                    onBlur={(event) => setEndTime(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <Form.Group>
                        <Form.Label>Period</Form.Label>
                        <Form.Select aria-label="Period select" defaultValue={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="1">1 second</option>
                            <option value="5">5 seconds</option>
                            <option value="10">10 seconds</option>
                            <option value="30">30 seconds</option>
                            <option value="60">1 minute</option>
                            <option value="300">5 minutes</option>
                            <option value="900">15 minutes</option>
                            <option value="3600">1 hour</option>
                            <option value="21600">6 hours</option>
                            <option value="86400">1 day</option>
                            <option value="604800">7 days</option>
                            <option value="2592000">30 days</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <hr />
            <Row>
                {metrics?.data.MetricDataResults.map((result, index) => (
                    <Col lg={4} md={6} sm={12} key={index}>
                        <Chart
                            options={{
                                chart: {
                                    id: "basic-bar"
                                },
                                xaxis: {
                                    categories: result.Timestamps.map(x => dateFormat(x, startDate === endDate ? "isoTime" : "isoDate")),
                                },
                                yaxis: {
                                    title: {
                                        text: yAxis[index]
                                    }
                                },
                                title: {
                                    text: result.Label,
                                    align: "left"
                                }
                            }}
                            series={[
                                {
                                    name: result.Label,
                                    data: result.Values
                                }
                            ]}
                            type="line"
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default DatabaseMetrics;
