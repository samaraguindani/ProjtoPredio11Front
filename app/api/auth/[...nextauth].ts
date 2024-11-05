import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import api from "../../../utils/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        codigo: { label: "Código", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await api.get("/Pessoa");

          if (!res.data || !res.data.$values) throw new Error("Erro ao buscar dados de usuários");

          const pessoas = res.data.$values;

          // Filtra a lista para encontrar o usuário correspondente
          const user = pessoas.find((pessoa) => 
            pessoa.pessoaIdUnivates === credentials.codigo &&
            pessoa.pessoaSenha === credentials.senha
          );

          // Se o usuário foi encontrado, retorna os dados; caso contrário, retorna null
          if (user) {
            return {
              id: user.pessoaId,
              name: user.pessoaNome,
              codigo: user.pessoaIdUnivates,
              tipo: user.pessoaTipo,
            };
          } else {
            throw new Error("Credenciais inválidas");
          }
        } catch (error) {
          console.error("Erro de autenticação:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Pode ser "jwt" ou "database" conforme sua necessidade
  },
  pages: {
    signIn: "/login", // Caminho personalizado para a página de login
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.codigo = user.codigo;
        token.tipo = user.tipo;
      }
      return token;
    },
    async session({ session, token }) {
        if (token) {
        session.user = {
            ...session.user,
            id: token.id,
            codigo: token.codigo,
            tipo: token.tipo,
        };
        }
    
        return session;
    },
      
  },
  debug: process.env.NODE_ENV === "development", // Ativa logs de debug em desenvolvimento
});
