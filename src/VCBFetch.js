import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { Nav } from "react-bootstrap";

//get today
var today = () => moment().format("DD/MM/YYYY");
var begin = () => moment().subtract(14, "days").format("DD/MM/YYYY");

var get14days = (day) => moment().subtract(day, "days").format("DD/MM/YYYY");

export default function Transactions() {
  const [loading, setLoading] = useState(false);
  const [server01Data, setServer01Data] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_VCB_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          begin: begin(),
          end: today(),
          username: process.env.REACT_APP_VCB_USERNAME,
          password: process.env.REACT_APP_VCB_PASSWORD,
          accountNumber: process.env.REACT_APP_VCB_ACCOUNTNUMBER,
        }),
      });
      const { results } = await response.json();
      setServer01Data(results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <Link to="/VCBFetch" className="mb-2 btn btn-success disabled">
              Xem chuyển khoản Vietcombank
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link to="/MOMOFetch" className="mb-2 btn btn-danger">
              Xem chuyển khoản MOMO
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Row>
        {loading && (
          <p style={{ fontSize: "4rem" }}>Đợi xíu, đang tải giao dịch...</p>
        )}
        {!loading &&
          server01Data.map((data, k) => {
            if (data.CD === "+") {
              //handle PCTime
              function zeroPad(num) {
                return num.toString().padStart(6, "0");
              }
              var validDate = moment(data.TransactionDate, "DD/MM/YYYY").format(
                "DD/MM/YYYY"
              );
              var validTime = moment(zeroPad(data.PCTime), "HH:mm:ss").format(
                "HH:mm:ss"
              );
              var validFullDateTime = moment(
                validDate + " " + validTime,
                "DD/MM/YYYY HH:mm:ss"
              );
              var validFullDateTimeString = validFullDateTime.format(
                "🗓️ddd, DD/MM/YYYY ⏰HH:mm:ss"
              );
              var momentFromNow = validFullDateTime.fromNow();

              //translate minutes ago...
              const momentFromNowTranslate = (moment) => {
                if (moment.includes("a few seconds ago") === true) {
                  return "vài giây trước";
                } else if (moment.includes("seconds ago") === true) {
                  return moment.replace("seconds ago", "giây trước");
                } else if (moment.includes("1 minute ago") === true) {
                  return "1 phút trước";
                } else if (moment.includes("minutes ago") === true) {
                  return moment.replace("minutes ago", "phút trước");
                } else if (moment.includes("an hour ago") === true) {
                  return "1 giờ trước";
                } else if (moment.includes("hours ago") === true) {
                  return moment.replace("hours ago", "giờ trước");
                } else if (moment.includes("a day ago") === true) {
                  return "1 ngày trước";
                } else if (moment.includes("days ago") === true) {
                  return moment.replace("days ago", "ngày trước");
                } else if (moment.includes("a month ago") === true) {
                  return moment.replace("a month ago", "1 tháng trước");
                } else if (moment.includes("months ago") === true) {
                  return moment.replace("months ago", "tháng trước");
                }
              };

              //translate date
              const translateValidFullDate = (weekday) => {
                if (weekday.includes("Mon")) {
                  return weekday.replace("Mon", "Thứ Hai");
                } else if (weekday.includes("Tue")) {
                  return weekday.replace("Tue", "Thứ Ba");
                } else if (weekday.includes("Wed")) {
                  return weekday.replace("Wed", "Thứ Tư");
                } else if (weekday.includes("Thu")) {
                  return weekday.replace("Thu", "Thứ Năm");
                } else if (weekday.includes("Fri")) {
                  return weekday.replace("Fri", "Thứ Sáu");
                } else if (weekday.includes("Sat")) {
                  return weekday.replace("Sat", "Thứ Bảy");
                } else if (weekday.includes("Sun")) {
                  return weekday.replace("Sun", "Chủ Nhật");
                }
              };

              //print if it's a new transaction
              const checkNewTransaction = (transdate) => {
                if (
                  moment().isBefore(moment(transdate).add(+20, "minutes")) ===
                  true
                ) {
                  return (
                    <Card.Header style={{ fontSize: "2rem" }}>
                      <Badge bg="warning">Mới</Badge>
                    </Card.Header>
                  );
                }
              };

              //print cards
              return (
                <Col key={k} xs={12} md={4} lg={3}>
                  <Card
                    border="success"
                    style={{ width: "20rem", margin: "5px 5px 5px 5px" }}
                  >
                    {checkNewTransaction(validFullDateTime)}
                    <Card.Body>
                      <Badge bg="success">
                        <Card.Text style={{ fontSize: "2rem" }}>
                          Nhận {data.Amount}đ
                        </Card.Text>
                      </Badge>
                      <h4>
                        <Card.Text>
                          <Badge bg="secondary">
                            {momentFromNowTranslate(momentFromNow)}
                          </Badge>
                        </Card.Text>
                      </h4>
                      <Card.Text>
                        {translateValidFullDate(validFullDateTimeString)}
                      </Card.Text>
                      {/* minutes ago comes here */}
                      <Card.Text>{data.Description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
          })}
      </Row>
    </Container>
  );
}
