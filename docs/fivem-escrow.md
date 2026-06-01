# What is FiveM Escrow?

FiveM Escrow is a protection system used by resource creators to protect selected files while still allowing server owners to configure and use the script.

## Overview

An escrowed script can contain both protected and open files.

Protected files usually contain critical logic, licensing, anti-tamper checks, or source code that should not be modified directly.

Open files usually contain configuration, framework adapters, functions, language files, public events, or other integration points.

## How Oskar Scripts Use It

Oskar scripts are designed so the critical core can stay protected while the adaptation layer remains open.

For example, `oskar_battlepass` keeps framework-specific logic in open adapter files, while the main protected core can keep the sensitive logic closed.

## What You Can Edit

You can usually edit:

- Configuration files.
- Framework adapter files.
- Open function files.
- Public integration files.
- Documentation files.

Avoid editing protected core files unless the resource specifically documents that they are open and safe to change.
