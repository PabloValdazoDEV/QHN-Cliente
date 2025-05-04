router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Intentando login con:", email);
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("Usuario encontrado:", user);
    
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("Contraseña coincide:", passwordMatch);
    
    if (!passwordMatch) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );
    
    console.log("Token generado exitosamente");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Server error" });
  }
}); 