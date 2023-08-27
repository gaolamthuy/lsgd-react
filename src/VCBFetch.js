import moment from "moment";
import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Stack,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { TransactionCard } from "./TransactionCard";

//get today
var today = () => moment().format("DD/MM/YYYY");
var begin = () => moment().subtract(14, "days").format("DD/MM/YYYY");

function parseDate(str) {
  var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? new Date(m[3], m[2] - 1, m[1]) : null;
}

export default function Transactions() {
  const [loading, setLoading] = useState(false);
  const [server01Data, setServer01Data] = useState();
  const [groupData, setGroupData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_VCB_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "transactions",
        begin: begin(),
        end: today(),
        username: process.env.REACT_APP_VCB_USERNAME,
        password: process.env.REACT_APP_VCB_PASSWORD,
        accountNumber: process.env.REACT_APP_VCB_ACCOUNTNUMBER,
      }),
    });
    const results = (await response.json()).transactions;
    console.log(results);
    const sortedData = results.sort(function (a, b) {
      return (
        new Date(parseDate(b.TransactionDate)) -
        new Date(parseDate(a.TransactionDate))
      );
    });
    setServer01Data(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [refreshData]);

  useEffect(() => {
    if (server01Data) {
      const groups = server01Data.reduce((groups, item) => {
        const date = item.TransactionDate;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});
      setGroupData(groups);
    }
  }, [server01Data]);

  const transactionData = Object.keys(groupData).map((date) => {
    return { date, data: groupData[date] };
  });

  return (
    <Container className="mt-5">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link>
            <Button
              className="button"
              variant="success"
              type="button"
              onClick={() => setRefreshData(!refreshData)}
            >
              Xem chuyển khoản Vietcombank
            </Button>
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
          transactionData.map((item, i) => {
            const olderDays = moment().diff(parseDate(item.date), "days");
            var dateCount =
              olderDays === 0 ? (
                <Alert variant="primary">⚠️⚠️ Hôm nay</Alert>
              ) : olderDays === 1 ? (
                <Alert variant="secondary">Hôm qua</Alert>
              ) : (
                <Alert variant="secondary">{olderDays + " ngày trước"}</Alert>
              );

            return (
              <div key={i}>
                <h3 className="mt-4">{dateCount}</h3>
                <Row>
                  <TransactionCard key={i} post={item.data} />
                </Row>
              </div>
            );
          })}

        {}
      </Row>
    </Container>
  );
}
