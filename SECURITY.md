# Security Policy

## Reporting a vulnerability

Email **`security@x-phere.com`** with the subject prefix **`[SECURITY]`**.

Do **not** open a public issue or pull request for a security problem. A public report exposes the
issue to everyone before a fix exists.

Useful things to include: what the issue is, how to reproduce it, what an attacker could do with it,
and how to reach you. If you intend to disclose publicly, say so in your first message so a timeline
can be agreed.

## Scope

This repository holds the source of the XPHERE documentation site. Two different kinds of report
land here:

**Documentation issues** — a wrong contract address, an endpoint that is not operated by the
Foundation, an incorrect chain ID, or any instruction that would cause a reader to lose funds or
expose a key. These matter even though this is "just docs", because people act on what is written
here. Report them to the address above rather than as a public issue.

**Protocol, client, or contract vulnerabilities** — issues in the XPHERE chain, the XEN node client,
or deployed contracts are not fixed in this repository, but the same address is the right place to
send them.

Issues in third-party applications built on XPHERE belong to their operators.

## Verifying what is official

Anything claiming to be from the XPHERE Foundation that did not arrive through a channel listed in
the [Security](https://docs.x-phere.com/resources/security) documentation should be treated as
unverified. The Foundation will never ask for a private key or seed phrase.

## Audits

The XPHERE Main Chain client has been audited by [Hacken](https://hacken.io/audits/xphere/). The
audit record is published on Hacken's own site and can be checked independently.
