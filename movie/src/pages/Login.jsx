import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("올바른 이메일 형식 아닙니다.").required("이메일을 입력하세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 8~16자 사이로 입력하세요.")
    .max(16, "비밀번호를 입력하세요.")
    .required("비밀번호는 8~16자 사이로 입력하세요."),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // console.log(errors);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>로그인</h1>
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px", width: "16rem" }}
      >
        <Input
          type="email"
          {...register("email")}
          onBlur={() => trigger("email")}
          autoComplete="off"
          $error={errors?.email}
        />
        {errors?.email && <ErrorMessage>{errors?.email?.message}</ErrorMessage>}
        <Input
          type="password"
          {...register("password")}
          onBlur={() => trigger("password")}
          $error={errors?.password}
        />
        {errors?.password && <ErrorMessage>{errors?.password?.message}</ErrorMessage>}
        <Button type="submit" disabled={!isValid}>
          로그인
        </Button>
      </form>
    </div>
  );
}

const Input = styled.input`
  padding: 8px 16px 8px 16px;
  height: 2.5rem;
  border-radius: 32px;
  outline: none;
  border: ${(props) => (props?.$error ? "2px solid red" : "none")};

  &:focus {
    border: ${(props) => (props?.$error ? "2px solid skyblue" : "none")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Button = styled.button`
  padding: 8px 16px 8px 16px;
  height: 2.5rem;
  border-radius: 32px;
  color: white;
  background: #e31b64;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    background: #b80f4c;
  }

  &:disabled {
    background: gray;
  }
`;
