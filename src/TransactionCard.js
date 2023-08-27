import React from "react";
import moment from "moment";
import { Card, Col, Badge } from "react-bootstrap";

export const TransactionCard = ({ post }) => {
  const weekdayMap = {
    Mon: "Thứ Hai",
    Tue: "Thứ Ba",
    Wed: "Thứ Tư",
    Thu: "Thứ Năm",
    Fri: "Thứ Sáu",
    Sat: "Thứ Bảy",
    Sun: "Chủ Nhật",
  };

  const translations = {
    "a few seconds ago": "vài giây trước",
    "seconds ago": "giây trước",
    "1 minute ago": "1 phút trước",
    "minutes ago": "phút trước",
    "an hour ago": "1 giờ trước",
    "hours ago": "giờ trước",
    "a day ago": "1 ngày trước",
    "days ago": "ngày trước",
    "a month ago": "1 tháng trước",
    "months ago": "tháng trước",
  };

  const translateValidFullDate = (weekday) => {
    const key = Object.keys(weekdayMap).find((key) => weekday.includes(key));
    return key ? weekday.replace(key, weekdayMap[key]) : weekday;
  };

  const momentFromNowTranslate = (momentTime) => {
    const key = Object.keys(translations).find((key) =>
      momentTime.includes(key)
    );
    return key ? momentTime.replace(key, translations[key]) : momentTime;
  };

  const typeOfMomentFromNow = (momentTime) => {
    return [
      "a few seconds ago",
      "seconds ago",
      "1 minute ago",
      "minutes ago",
      "an hour ago",
      "hours ago",
    ].some((keyword) => momentTime.includes(keyword))
      ? "primary"
      : "secondary";
  };

  const checkNewTransaction = (transdate) =>
    moment().isBefore(moment(transdate).add(20, "minutes")) ? (
      <Card.Header style={{ fontSize: "2rem" }}>
        <Badge bg="warning">Mới</Badge>
      </Card.Header>
    ) : null;

  const zeroPad = (num) => num.toString().padStart(6, "0");

  return (
    <>
      {post.map((data, k) => {
        if (data.CD === "+") {
          const validDate = moment(data.TransactionDate, "DD/MM/YYYY").format(
            "DD/MM/YYYY"
          );
          const validTime = moment(zeroPad(data.PCTime), "HH:mm:ss").format(
            "HH:mm:ss"
          );
          const validFullDateTime = moment(
            `${validDate} ${validTime}`,
            "DD/MM/YYYY HH:mm:ss"
          );
          const validFullDateTimeString = validFullDateTime.format(
            "🗓️ddd, DD/MM/YYYY ⏰HH:mm:ss"
          );
          const momentFromNow = validFullDateTime.fromNow();

          return (
            <Col key={k} className="py-2" xs={12} md={6} lg={4}>
              <Card border="success">
                {checkNewTransaction(validFullDateTime)}
                <Card.Body>
                  <Badge bg="success" className="mb-1">
                    <Card.Text style={{ fontSize: "1.8rem" }}>
                      Nhận {data.Amount}đ
                    </Card.Text>
                  </Badge>
                  <h4>
                    <Card.Text>
                      <Badge bg={typeOfMomentFromNow(momentFromNow)}>
                        {momentFromNowTranslate(momentFromNow)}
                      </Badge>
                    </Card.Text>
                  </h4>
                  <Card.Text>
                    {translateValidFullDate(validFullDateTimeString)}
                  </Card.Text>
                  <Card.Text>{data.Description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        }
        return null;
      })}
    </>
  );
};
