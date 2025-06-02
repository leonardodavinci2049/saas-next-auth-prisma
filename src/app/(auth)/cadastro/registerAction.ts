"use server";

import cnxDataBase from "@/lib/dbConnection";
import { hashSync } from "bcrypt-ts";

// Definir o tipo do estado
type RegisterState = {
  message: string;
  success: boolean;
} | null;

// Definir o tipo dos dados do formulário
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as RegisterFormData;

  // console.log("Form Data1:", data);

  // Validação básica
  if (!data.name || !data.email || !data.password) {
    return {
      message: "Todos os campos são obrigatórios.",
      success: false,
    };
  }

  try {
    // Verificação de duplicidade no banco de dados
    const existingUser = await cnxDataBase.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        message: "Este email já está cadastrado.",
        success: false,
      };
    }

    // Hash da senha
    const hashedPassword = hashSync(data.password, 12);

    // Criar usuário
    await cnxDataBase.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      message: "Usuário cadastrado com sucesso!",
      success: true,
    };
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return {
      message: "Erro interno do servidor. Tente novamente.",
      success: false,
    };
  }
}

export default registerAction;
