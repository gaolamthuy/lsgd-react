import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { Nav } from "react-bootstrap";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [server02Data, setServer02Data] = useState([]);

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_MOMO_URL);
    const { momoMsg } = await response.json();

    setServer02Data(momoMsg);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link>
            <Link to="/" className="mb-2 btn btn-success">
              Xem chuyển khoản Vietcombank
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <Link to="/MOMOFetch" className="mb-2 btn btn-danger disabled">
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
          server02Data.map((data, k) => {
            if (data.id !== 0) {
              // var moment = moment(data.time)
              var momentFromNow = moment(data.lastUpdate).fromNow();

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
              // console.log(JSON.parse(data.transhisData).baseInfo)

              // get transaction description
              const transhisData = JSON.parse(data.transhisData);
              const shortTitle = transhisData.baseInfo.title.vi;

              // console.log(checkNewTransaction(moment(data.time)))

              return (
                <Col key={k} xs={12} md={4} lg={3}>
                  <Card
                    border="danger"
                    style={{ width: "20rem", margin: "5px 5px 5px 5px" }}
                  >
                    <Card.Body>
                      <Badge bg="danger">
                        <Card.Title>
                          Nhận{" "}
                          {parseFloat(data.totalAmount).toLocaleString("en")}đ
                        </Card.Title>
                      </Badge>
                      <h4>
                        <Card.Text>
                          <Badge bg="secondary">
                            {momentFromNowTranslate(momentFromNow)}
                          </Badge>
                        </Card.Text>
                      </h4>
                      <Card.Text>
                        {moment(data.lastUpdate).format("DD/MM/YYYY HH:mm:ss")}
                      </Card.Text>
                      <Card.Text>
                        {shortTitle} {data.comment}
                      </Card.Text>
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
