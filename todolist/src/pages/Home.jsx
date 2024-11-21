import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/api";
import { Todo } from "../component/Todo";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Blocks } from "react-loader-spinner";

const schema = yup.object().shape({
  title: yup.string().required("제목은 필수입니다."),
  content: yup.string().optional(),
});

export default function Home() {
  const queryClient = useQueryClient();

  const { mutate: mutateTodo } = useMutation({
    mutationFn: ({ title, content }) =>
      axiosInstance.post("/todo", { title, content, checked: false }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist"]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    // console.log(data);

    mutateTodo({ checked: false, ...data });
  };

  const { data, isLoading } = useQuery({
    queryFn: () => axiosInstance.get("/todo").then((res) => res.data),
    queryKey: ["todolist"],
  });

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="제목을 입력해주세요"
          {...register("title")}
          onBlur={() => trigger("title")}
        />
        {errors.title && <Error>{errors.title.message}</Error>}
        <Input
          placeholder="내용을 입력해주세요"
          {...register("content")}
          onBlur={() => trigger("content")}
        />
        {errors.content && <span>{errors.content.message}</span>}
        <Button type="submit">ToDo 생성</Button>
      </Form>
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {isLoading && <Blocks height="80" width="80" color="#4fa94d" visible={true} />}
        {data?.[0]?.length > 0 ? (
          data[0].map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              content={todo.content}
              checked={todo.checked}
            />
          ))
        ) : (
          <span>ToDo가 없습니다.</span>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 16rem;
  padding: 16px 24px 16px 24px;
  font-size: 1.05rem;
  border: 1px solid gray;
  border-radius: 32px;
  &::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  width: 16rem;
  padding: 16px 24px 16px 24px;
  border: none;
  border-radius: 32px;
  background-color: lightblue;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: none;
  }
`;

const Error = styled.span`
  font-size: 0.9rem;
  color: red;
`;
