import TokenForm from "@/components/form/tokenForm";
 
export default function LoginAuth(props) {
  const { searchParams } = props;
  const { code, error } = searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="md:container md:mx-auto">
        <div className="flex justify-center">
          <div className=" -auth-form">
            <TokenForm code={code} error={error}></TokenForm>
          </div>
        </div>
      </div>
    </div>
  );
}
