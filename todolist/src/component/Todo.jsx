import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../utils/api";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export const Todo = ({ id, title, content, checked }) => {
  const queryClient = useQueryClient();

  const { mutate: mutateTodo } = useMutation({
    mutationFn: ({ ...data }) =>
      axiosInstance.patch(`/todo/${id}`, { id, title, content, checked, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist", "tododetail"]);
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: () => axiosInstance.delete(`/todo/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist", "tododetail"]);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const [titleValue, setTitleValue] = useState(title);
  const [contentValue, setContentValue] = useState(content);

  const [isChecked, setIsChecked] = useState(undefined);

  const useDebouncedCheck = useDebounce(isChecked, 1000);

  useEffect(() => {
    if (isChecked !== undefined) {
      mutateTodo({ checked: isChecked });
    }
  }, [useDebouncedCheck]);

  return (
    <ToDo>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <Content>
          <Link to={`/todo/${id}`} onClick={(e) => (isEditing ? e.preventDefault() : undefined)}>
            <Input
              $isEditing={isEditing}
              placeholder={isEditing ? "제목을 입력하세요" : undefined}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              readOnly={!isEditing}
              style={{ fontSize: "1.05rem" }}
            />
            <Input
              $isEditing={isEditing}
              placeholder={isEditing ? "내용을 입력하세요" : undefined}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              readOnly={!isEditing}
            />
          </Link>
        </Content>
      </div>
      <div>
        {isEditing ? (
          <Action
            onClick={() => {
              setIsEditing(false);
              mutateTodo({ title: titleValue, content: contentValue });
            }}
          >
            완료
          </Action>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
          >
            <Action onClick={() => setIsEditing(true)}>수정</Action>
            <Action onClick={() => deleteTodo()} $delete>
              삭제
            </Action>
          </div>
        )}
      </div>
    </ToDo>
  );
};

const ToDo = styled.div`
  width: 24rem;
  padding: 16px 24px 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid black;
  border-radius: 32px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`;

const Action = styled.button`
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: ${({ $delete }) => ($delete ? "pink" : "lightgray")};
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: ${({ $isEditing }) => ($isEditing ? "1px solid blue" : "none")};
  border-radius: 8px;
  outline: none;
`;
