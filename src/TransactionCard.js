import React from "react";
import moment from "moment";
import { Card, Col, Badge } from "react-bootstrap";

const TransactionCard = ({ post }) => {
  return (
    <>
      {post.map((data, k) => {
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
          console.log(typeof momentFromNow);

          const typeOfMomentFromNow = (moment) => {
            const primaryKeywords = [
              "a few seconds ago",
              "seconds ago",
              "1 minute ago",
              "minutes ago",
              "an hour ago",
              "hours ago",
            ];

            return primaryKeywords.some((keyword) => moment.includes(keyword))
              ? "primary"
              : "secondary";
          };

          const momentFromNowTranslate = (moment) => {
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

            for (const keyword in translations) {
              if (moment.includes(keyword)) {
                return moment.replace(keyword, translations[keyword]);
              }
            }
          };

          const translateValidFullDate = (weekday) => {
            const weekdayMap = {
              Mon: "Thứ Hai",
              Tue: "Thứ Ba",
              Wed: "Thứ Tư",
              Thu: "Thứ Năm",
              Fri: "Thứ Sáu",
              Sat: "Thứ Bảy",
              Sun: "Chủ Nhật",
            };

            for (const key in weekdayMap) {
              if (weekday.includes(key)) {
                return weekday.replace(key, weekdayMap[key]);
              }
            }
          };

          //print if it's a new transaction
          const checkNewTransaction = (transdate) => {
            if (moment().isBefore(moment(transdate).add(20, "minutes"))) {
              return (
                <Card.Header style={{ fontSize: "2rem" }}>
                  <Badge bg="warning">Mới</Badge>
                </Card.Header>
              );
            }
          };

          //print cards
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
      })}
    </>
  );
};

export default TransactionCard;
