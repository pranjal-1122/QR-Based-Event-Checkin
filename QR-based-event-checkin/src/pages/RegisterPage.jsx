import Aurora from "../components/Aurora";
import RegistrationForm from "../components/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-28 pb-10">
      
      {/* WebGL Aurora Background Component */}
      <Aurora
        colorStops={["#09090b", "#10b981", "#022c22"]} // Matching TechPass dark-emerald theme
        blend={0.6}
        amplitude={1.0}
        speed={0.5}
      />
    
      <div className="relative z-10 w-full max-w-lg">
        <RegistrationForm />
      </div>

    </div>
  );
};

export default RegisterPage;