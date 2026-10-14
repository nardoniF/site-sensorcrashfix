# AGENTS

## Deploy / upload — package integrity (obrigatório)

Antes de qualquer deploy, pin de proxy (`COMMIT`), ou upload do que o usuário pediu para mudar: seguir a hard rule em `.cursor/rules/package-integrity-before-deploy.mdc`.

Resumo: auditar o **pacote inteiro** (diff vs pedido + vs o que já existe no alvo). Se algo existente seria **removido**, ou algo **não pedido** entraria — **não fazer deploy**; parar, reportar e preparar pacote só com o pedido.
