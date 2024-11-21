import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../utils/api";
import dayjs from "dayjs";
import { Blocks } from "react-loader-spinner";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryFn: () => axiosInstance.get(`/todo/${id}`).then((res) => res.data),
    queryKey: ["tododetail"],
  });

  return (
    <Wrapper>
      {isLoading && <Blocks height="80" width="80" color="#4fa94d" visible={true} />}
      {data && (
        <>
          <span>ID: {data.id}</span>
          <hr style={{ width: "100%" }} />
          <h3>{data.title}</h3>
          <span>{data?.content || "내용 없음"}</span>
          <hr style={{ width: "100%" }} />
          <span>생성 날짜: {dayjs(data.createdAt).format("YY년 M월 D일 H시 m분")}</span>
          <span>수정 날짜: {dayjs(data.updatedAt).format("YY년 M월 D일 H시 m분")}</span>
          <Back onClick={() => navigate("/")}>뒤로</Back>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Back = styled.button`
  padding: 16px 24px 16px 24px;
  border: none;
  border-radius: 8px;
  background: lightblue;
  color: white;
  cursor: pointer;
`;
