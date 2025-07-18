# TypeScript Best Practices para Next.js

## 📋 Guía completa para evitar errores de build en TypeScript

### 1. **Declaraciones de Variables y Tipos**

#### ✅ **Correcto**
```typescript
// Declaración explícita de tipos
const name: string = "Juan";
const age: number = 25;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const users: string[] = ["Ana", "Pedro"];

// Objetos
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Juan",
  email: "juan@example.com"
};
```

#### ❌ **Incorrecto**
```typescript
// Sin tipos explícitos (puede causar errores)
const name = "Juan"; // Inferido, pero mejor ser explícito
let data; // Tipo 'any' implícito
const config = {}; // Objeto vacío sin tipo
```

### 2. **useRef Hook - Problemas Comunes**

#### ✅ **Correcto**
```typescript
import { useRef } from 'react';

// Para elementos DOM
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);

// Para valores mutables
const countRef = useRef<number>(0);
const timerRef = useRef<number | undefined>(undefined);
const dataRef = useRef<MyInterface[]>([]);

// Para funciones
const callbackRef = useRef<(() => void) | null>(null);
```

#### ❌ **Incorrecto**
```typescript
// Sin inicialización (ERROR de build)
const animationRef = useRef<number>(); // ❌ Expected 1 arguments, but got 0

// Tipo incorrecto
const inputRef = useRef<HTMLElement>(null); // ❌ Muy genérico
```

### 3. **useState Hook - Tipado Correcto**

#### ✅ **Correcto**
```typescript
import { useState } from 'react';

// Tipos primitivos
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);

// Tipos union
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

// Objetos
interface User {
  id: number;
  name: string;
}

const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);

// Con valor inicial complejo
const [config, setConfig] = useState<Config>({
  theme: 'light',
  language: 'es'
});
```

### 4. **Interfaces y Types - Definiciones Claras**

#### ✅ **Correcto**
```typescript
// Interfaces para objetos
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // Propiedad opcional
  variant?: 'primary' | 'secondary';
}

// Types para unions y primitivos
type Theme = 'light' | 'dark';
type Status = 'loading' | 'success' | 'error';

// Interfaces extendidas
interface BaseUser {
  id: number;
  name: string;
}

interface AdminUser extends BaseUser {
  permissions: string[];
  role: 'admin' | 'super-admin';
}

// Generics
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### 5. **Componentes React - Tipado Completo**

#### ✅ **Correcto**
```typescript
import React, { ReactNode } from 'react';

// Props con children
interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// Componente con eventos
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (data: FormData) => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};
```

### 6. **Event Handlers - Tipado de Eventos**

#### ✅ **Correcto**
```typescript
// Eventos de mouse
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log('Clicked!');
};

// Eventos de formulario
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Lógica del formulario
};

// Eventos de input
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Eventos de teclado
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
};
```

### 7. **Async/Await - Promesas Tipadas**

#### ✅ **Correcto**
```typescript
// Función async con tipo de retorno
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

// Manejo de errores tipado
const fetchData = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    return { data, success: true };
  } catch (error) {
    return { 
      data: [], 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
```

### 8. **Utility Types - Herramientas Útiles**

#### ✅ **Ejemplos Prácticos**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - Hace todas las propiedades opcionales
type UserUpdate = Partial<User>;

// Pick - Selecciona propiedades específicas
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit - Excluye propiedades específicas
type CreateUser = Omit<User, 'id'>;

// Required - Hace todas las propiedades obligatorias
type RequiredUser = Required<User>;

// Record - Crea un tipo con claves y valores específicos
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

### 9. **Configuración tsconfig.json**

#### ✅ **Configuración Recomendada**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 10. **Errores Comunes y Soluciones**

#### ❌ **Error**: "Expected 1 arguments, but got 0"
```typescript
// Problema
const ref = useRef<number>(); // ❌

// Solución
const ref = useRef<number>(0); // ✅
const ref = useRef<number | undefined>(undefined); // ✅
```

#### ❌ **Error**: "Property 'x' does not exist on type 'never'"
```typescript
// Problema
const [data, setData] = useState([]); // ❌ Tipo inferido como never[]

// Solución
const [data, setData] = useState<MyType[]>([]); // ✅
```

#### ❌ **Error**: "Cannot assign to read only property"
```typescript
// Problema
const obj = { name: 'Juan' } as const;
obj.name = 'Pedro'; // ❌

// Solución
const obj: { name: string } = { name: 'Juan' }; // ✅
```

### 11. **Mejores Prácticas**

#### ✅ **DO (Hacer)**
- Siempre declarar tipos explícitos en funciones públicas
- Usar interfaces para objetos complejos
- Tipar todos los props de componentes
- Manejar casos de error con tipos union
- Usar utility types para reutilizar código

#### ❌ **DON'T (No hacer)**
- No usar `any` a menos que sea absolutamente necesario
- No omitir tipos en APIs públicas
- No usar `as` para casting inseguro
- No ignorar errores de TypeScript
- No usar `@ts-ignore` sin justificación

### 12. **Comandos Útiles**

```bash
# Verificar tipos sin compilar
npx tsc --noEmit

# Verificar tipos en modo watch
npx tsc --noEmit --watch

# Ejecutar linter con TypeScript
npm run lint

# Build con verificación de tipos
npm run build
```

### 13. **Recursos Adicionales**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [Next.js TypeScript Guide](https://nextjs.org/docs/basic-features/typescript)

---

**💡 Tip**: Siempre ejecuta `npm run build` antes de hacer commit para asegurar que no hay errores de TypeScript en producción.