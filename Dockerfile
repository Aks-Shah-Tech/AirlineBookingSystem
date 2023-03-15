#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["AilrineWebAPI/AilrineWebAPI.csproj", "AilrineWebAPI/"]
RUN dotnet restore "AilrineWebAPI/AilrineWebAPI.csproj"
COPY . .
WORKDIR "/src/AilrineWebAPI"
RUN dotnet build "AilrineWebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AilrineWebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AilrineWebAPI.dll"]